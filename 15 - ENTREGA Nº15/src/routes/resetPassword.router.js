// routes/resetPassword.js
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendMail } = require('../utils/sendEmail');
const PasswordResetToken = require('../dao/models/passwordResetToken');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const userController = new UserController();
const { createHash, isValidPassword } = require('../utils/hashBcrypt');

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get('/', (req, res) => {
    res.render('reset-password');
});

// Ruta para enviar el enlace de restablecimiento
router.post('/send-link', async (req, res) => {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString('hex');
    const resetLink = `http://localhost:8080/reset-password/${token}`;

    const mailContent = `
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
    `;

    try {
        // Crear un nuevo token de restablecimiento
        const passwordResetToken = new PasswordResetToken({
            email: email,
            token: token,
            expires: Date.now() + 3600000 // 1 hora desde ahora
        });

        await passwordResetToken.save();

        await sendMail(email, 'Restablecimiento de Contraseña', mailContent);
        res.send('Correo enviado con éxito');
    } catch (err) {
        console.error('Error al enviar el correo:', err);
        res.status(500).send('Error al enviar el correo');
    }
});

// Ruta para mostrar el formulario de nueva contraseña
router.get('/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const resetToken = await PasswordResetToken.findOne({
            token: token,
            expires: { $gt: Date.now() } // Verifica que el token no ha expirado
        });

        if (!resetToken) {
            // Redirige a la página de solicitud de restablecimiento de contraseña si el token ha expirado
            return res.redirect('/reset-password');
        }

        res.render('newpassword', { token });
    } catch (err) {
        console.error('Error al verificar el token:', err);
        res.status(500).send('Error al verificar el token');
    }
});

router.post('/:token', async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.password; // Obtén la nueva contraseña del cuerpo de la solicitud

    try {
        const resetToken = await PasswordResetToken.findOne({
            token: token,
            expires: { $gt: Date.now() } 
        });

        if (!resetToken) {
            return res.status(400).send('El token de restablecimiento es inválido o ha expirado.');
        }

        // Obtener el email del usuario usando el token
        const email = resetToken.email;

        // Obtener el usuario utilizando el método getUsersBy del UserController
        const userResponse = await userController.getUsersBy({ email: email });

        // Verificar si se encontró algún usuario
        if (!userResponse || !userResponse.users || userResponse.users.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Acceder al primer usuario encontrado (asumimos que solo hay uno por email)
        const user = userResponse.users[0];
        console.log(`Usuario encontrado:`, user);

        // Asegurarse de que el usuario tiene una propiedad _id
        if (!user._id) {
            return res.status(500).send('Error al obtener la ID del usuario');
        }

        // Verificar que la nueva contraseña no sea la misma que la antigua
        const isSamePassword = bcrypt.compareSync(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).send('La nueva contraseña no puede ser igual a la anterior.');
        }

        // Encriptar la nueva contraseña antes de actualizarla
        const hashedPassword = await createHash(newPassword);
        console.log(`Contraseña encriptada para ${email}:`, hashedPassword);

        // Actualizar la contraseña utilizando el método updateUser del UserController
        const updatedUser = await userController.updateUserById(user._id, { password: hashedPassword });

        res.send('Contraseña actualizada con éxito');
    } catch (err) {
        console.error('Error al actualizar la contraseña:', err);
        res.status(500).send('Error al actualizar la contraseña');
    }
});


module.exports = router;
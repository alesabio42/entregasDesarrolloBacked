const { Router } = require('express');
const router = Router();
const UserManager = require('../dao/managers/MDB/userManager');
const { createHash, isValidPassword } = require('../utils/hashBcrypt')
const { auth } = require('../../src/middleware/authetication.middleware');
const { generateToken, authTokenMiddleware } = require('../utils/jsonwebtoken');

const passport = require('passport');

const sessionsService = new UserManager();

router.post('/register', async (req, res) => {
  try {
      // Obtener datos del usuario desde el cuerpo de la solicitud (req.body)
      const { first_name, last_name, age, email, password } = req.body;

      // Verificar si el usuario ya existe
      let userResponse = await sessionsService.getUsersBy({ email });
      let user = userResponse.status === 'success' ? userResponse.users[0] : null;

      if (user) {
          // El usuario ya existe, puedes manejar esto como desees
          return res.status(400).send({ status: 'error', message: 'El usuario ya existe' });
      }

      // Crear un nuevo usuario
      const newUser = {
          first_name,
          last_name,
          age,
          email,
          password: createHash(password),
          cart: undefined
      };

      // Registrar el usuario en la base de datos
      let result = await sessionsService.createUser(newUser);

      res.redirect('/login');

      
  } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).send({ status: 'error', message: 'Error en el registro' });
  }
});


router.get('/failregister', async (req, res) => {
  res.send({ error: 'falla en el register' });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const userResponse = await sessionsService.getUsersBy({ email });
      
      // Validar que exista el usuario
      if (!userResponse || userResponse.users.length === 0) {
          return res.status(401).send('No coincide las credenciales');
      }

      const user = userResponse.users[0];

      // Validar la contraseña
      if (!isValidPassword(password, user.password)) {
          return res.status(401).send('No coincide las credenciales');
      }

      // Generar token
      const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        id: user._id,
        email: user.email,
    });

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (24 horas)
    });

    res.redirect('/session/current'); 

  } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).send({ status: 'error', message: 'Error en el inicio de sesión', error: error.message });
  }
});



router.get('/current', authTokenMiddleware, async (req, res) => {
  // Verificar el rol del usuario y redirigir en consecuencia
  const user = req.user;
  console.log('Datos del usuario:', user);
  if (req.userRole === 'admin') {
      // Si el rol es 'admin', redirigir a la ruta de administrador
      res.redirect('/');
  } else {
      // Si el rol es 'user', redirigir a la ruta de usuario
      res.redirect('/products');
  }
});


// Ruta para iniciar la autenticación con GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Ruta de callback después de la autenticación con GitHub
router.get('/githubcallback', (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/session/login' }, async (err, user) => {
      try {
          if (err || !user) {
              console.error('Fallo en la autenticación de GitHub');
              return res.redirect('/session/login');
          }

          // Generar token JWT
          const token = generateToken({
              first_name: user.first_name,
              last_name: user.last_name,
              id: user._id,
              email: user.email,
          });

          // Establecer la cookie con el token JWT
          res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (24 horas)
          });

          res.redirect('/session/current');
      } catch (error) {
          console.error('Error en la autenticación de GitHub:', error);
          res.redirect('/session/login');
      }
  })(req, res, next);
});

router.get('/faillogin', async (req, res) => {
  res.send({ error: 'falla en el register' });
});



router.get('/logout', (req, res) => {
  // Eliminar la cookie de JWT al hacer logout
  res.clearCookie('jwt');
  // Otras acciones de logout, si las tienes
  res.redirect('/login');
});

module.exports = router;

const { Router} = require('express');
const router = Router();
const UserManager = require ('../dao/managers/MDB/userManager');
const { auth } = require('../../src/middleware/authetication.middleware');

const passport = require('passport')

const sessionsService = new UserManager ();

router.post('/register', passport.authenticate('register', {failureRedirect: '/routes/session/faillogin'}) ,async (req, res)=>{
  res.send({status: 'success', message: 'user registered'})
})


router.get('/failregister', async (req, res) => {
  res.send({error: 'falla en el register'})
})
router.post('/login', passport.authenticate('login', {failureRedirect: '/routes/session/faillogin'}) ,async (req, res)=>{
  if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})
  
  req.session.user = { 
    first_name: req.user.first_name, 
    last_name: req.user.last_name,
    email: req.user.email, 
    id: req.user._id,
    rol: req.user.rol  // Asegúrate de tener esta línea
};
  
  console.log('Rol del usuario:', req.user.rol);
  res.redirect('/session/current');

})

router.get('/github', passport.authenticate('github', {scope:['user:email']}),async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/session/login' }), async (req, res) => {
  try {
      if (!req.user) {
          console.error('Fallo en la autenticación de GitHub');
          return res.redirect('/session/login');
      }

      req.session.user = req.user;
      res.redirect('/products');
  } catch (error) {
      console.error('Error en la autenticación de GitHub:', error);
      res.redirect('/session/login');
  }
});




router.get('/faillogin', async (req, res) => {
  res.send({error: 'falla en el register'})
})

// Ruta protegida por el middleware de autenticación
router.get('/current', auth, async (req, res) => {
  // Verificar el rol del usuario y redirigir en consecuencia
  if (req.userRole === 'admin') {
      // Si el rol es 'admin', redirigir a la ruta de administrador
      res.redirect('/');
  } else {
      // Si el rol es 'user', redirigir a la ruta de usuario
      res.redirect('/products');
  }
}); 





router.get('/logout', (req, res) => {
  // Utiliza la función req.logout() para cerrar la sesión
  req.logout(err => {
    if (err) {
      console.error('Error al hacer logout:', err);
      return res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
    }

    // Redirige a la página de inicio de sesión o a donde desees después del logout
    res.redirect('/login');
  });
});

module.exports = router

// router.post('/register', async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;

//   try {
//       // Verificar si el usuario ya existe utilizando el UserManager
//       const exists = await sessionsService.getUsersBy({ email });

//       if (exists.status === 'success' && exists.users.length > 0) {
//           return res.status(401).json({ status: 'error', message: 'El usuario ya existe' });
//       }

//       // Encriptar la contraseña antes de almacenarla en la base de datos
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Crear el nuevo usuario con la contraseña encriptada
//       const newUser = {
//           first_name,
//           last_name,
//           email,
//           password: hashedPassword,
//           rol: 'user'
//       };

//       // Almacenar el nuevo usuario en la base de datos utilizando el UserManager
//       const result = await sessionsService.createUser(newUser);

//       res.status(200).json({
//           status: 'success',
//           message: 'Usuario creado correctamente',
//           user: result,
//       });
//   } catch (error) {
//       console.error('Error al crear el usuario:', error);
//       res.status(500).json({ status: 'error', message: 'Error al crear el usuario' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Buscar al usuario por el correo electrónico en la base de datos
//     const userResponse = await sessionsService.getUsersBy({ email });

//     if (userResponse.status !== 'success' || userResponse.users.length === 0) {
//       return res.status(401).json({ status: 'error', message: 'HOLA Usuario o contraseña incorrectos' });
//     }

//     const user = userResponse.users[0];
//     console.log('Estructura de user:', user);

//     // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
//     console.log('Contraseña almacenada:', user.password);
//     console.log('Contraseña proporcionada:', password);

//     // Realizar la comparación directa de las contraseñas en texto plano
//     const passwordMatch = user ? bcrypt.compareSync(password, user.password) : false;



//     console.log('1 Contraseña almacenada:', user.password);
//     console.log('2 Contraseña proporcionada:', password);

//     console.log('passwordMatch:', passwordMatch);

//     if (!passwordMatch) {
//       return res.status(401).json({ status: 'error', message: 'CHAU Usuario o contraseña incorrectos' });
//     }

//     // Si las contraseñas coinciden, establecer la sesión del usuario
//     req.session.user = {
//       id: user._id,
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       rol: user.rol
//     };

//     res.status(200).json({
//       status: 'success',
//       payload: req.session.user,
//       message: 'Login correcto',
//     });
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//     res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
//   }
// });


// // Ruta del dashboard del administrador
// router.get('/', auth, (req, res) => {
//   res.status(200).json({ status: 'success', message: 'Dashboard del administrador' });
// });

// // Ruta del dashboard del usuario normal
// router.get('/products', auth, (req, res) => {
//   res.status(200).json({ status: 'success', message: 'Dashboard del usuario normal' });
// });



// router.get('/setcookie', (req, res) => {
//     // Configurar la cookie
//     res.cookie('miCookie', 'Hola, esta es mi cookie', { maxAge: 900000}).send('Cookie configurada correctamente');
//   });
//   router.get('/setcookiesigned', (req, res) => {
//     // Configurar la cookie
//     res.cookie('miCookie', 'Hola, esta es mi cookie firmada', { maxAge: 900000, signed:true}).send('Cookie configurada correctamente');
//   });
  
//   router.get('/getcookie', (req, res) => {
  
//     res.send(req.cookies);
//   });
  
  
//   router.get('/getcookiesigned', (req, res) => {
//     console.log(req.signedCookies)
  
//     res.send(req.signedCookies);
//   });
  
  
  
//   router.get('/deletecookie', (req, res) => {
  
  
  
//     res.clearCookie('miCookie').send('Cookie borrada');
//   });
  





// Exportar router


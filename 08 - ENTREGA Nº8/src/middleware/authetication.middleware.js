// Middleware de autenticación
function auth(req, res, next) {
    // Verificar si el usuario está autenticado
    if (!req.session?.user) {
      return res.status(401).json({ status: 'error', message: 'No autorizado' });
    }
  
    // Imprime el objeto completo para verificar
    console.log('Usuario en middleware:', req.session?.user);
  
    // Agregar la información del rol al objeto de solicitud para que esté disponible en las rutas
    req.userRole = req.session?.user.rol;
  
    // Imprime el rol para verificar
    console.log('Rol del usuario en middleware:', req.userRole);
  
    // Continuar con el siguiente middleware o ruta
    next();
  }
  

module.exports = { auth };
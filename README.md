# Repositorio con las entregas del curso de Programaciôn Backend - Coderhouse

En el marco de mi recorrido por el curso de Programación Backend realizado en Coderhouse, iré cargando los archivos de las entregas presentadas.

## Entregas realizadas y descripción de las mismas 

1. **ENTREGA 1 - Clases con ECMAScript y ECMAScript avanzado:** Este código implementa la clase ProductManager en ECMAScript, diseñada para gestionar un conjunto de productos. La clase ofrece métodos para agregar productos con validaciones, obtener una lista de productos, y buscar productos por ID. Las funciones de validación garantizan campos obligatorios y códigos únicos. 
2. **ENTREGA 2 - Manejo de archivos:** Este conjunto de archivos proporciona una solución para la gestión de productos mediante la implementación de la clase ProductManager en ECMAScript. A diferencia de la entrega anterior, en esta versión se integra la persistencia de datos mediante el almacenamiento de productos en un archivo JSON llamado productos.json. La clase ProductManager ofrece métodos para agregar, consultar, actualizar y eliminar productos, garantizando la persistencia de los datos incluso entre ejecuciones del script.
3. **ENTREGA 3 - Servidor con express:** Esta carpeta contiene una aplicación simple que implementa un servidor con Express y utiliza una clase ProductManager para gestionar productos con persistencia en un archivo JSON.
4. **ENTREGA 4 - Primera pre-entrega Proyecto FiNAL:** Este es un backend simple para la gestión de productos y carritos utilizando Express y el sistema de archivos para persistencia.
5. **ENTREGA 5 - Websockets + Handlebars:**
6. **ENTREGA 6 - Práctica de integración sobre el ecommerce:** Introduce el modelo de persistencia de Mongo y Mongoose al proyecto.
7. **ENTREGA 7 - Segunda pre-entrega del Proyecto final:** Agrega una vista de productos donde los usuarios pueden añadir elementos al carrito y visualizar su composición.
8. **ENTREGA 8 - Implementación de Login:** Implementa el sistema de inicio de sesión (Login) y registro (Register), permitiendo la diferenciación entre dos roles de usuarios: administrador y usuario estándar. En esta entrega se ha integrado el hacheo de contraseñas mediante bcrypt y la implementación de Passport para las funciones de registro y login.
9. **ENTREGA 9 - Refactor de Login:** En esta fase, se ha llevado a cabo una mejora en la autenticación del sistema al incorporar el método de autenticación de GitHub a la interfaz de inicio de sesión.
10. **ENTREGA 10 - Práctica de integración sobre tu ecommerce:** En la última actualización, se ha modificado el userModel agregando campos como "age" y "cart" (cuenta con el id del carrito del usuario). Además, se ha migrado de session-express a JSON Web Tokens (JWT) para la gestión de sesiones, proporcionando una solución más flexible.
11. **ENTREGA 11 - Reestructura de nuestro servidor:** En esta entrega se realiza la separación del router, dejando la siguiente estructura: router, controller y manager.
12. **ENTREGA 12 - Tercera pre-entrega del Proyecto final:** En esta entrega se ha añadido un middleware para restringir el acceso a ciertos endpoints, se ha creado un modelo de Ticket y se han implementado funcionalidades clave como el envío de correos electrónicos, Factory, DAO y DTO.
13. **ENTREGA 13 - Mocking y manejo de errores:** En esta entrega se incluye manejo de errores al crear productos y agregar usuarios. También se agrega un módulo de Mocking para el servidor que genera 100 productos con el formato de una petición de Mongo en '/mockingproducts'.
14. **ENTREGA 14 - Implementación de logger:** Se implementó un sistema de logging utilizando la librería Winston, eliminando todos los "console" en los controladores y reemplazándolos por "logger" para mejorar la gestión de logs. Además, se agregó una ruta de prueba (/loggerTest) para verificar el funcionamiento del sistema de logging.
15. **ENTREGA 15 - Práctica de integración sobre tu ecommerce:** Se ha implementado un sistema de recuperación de contraseñas con envío de enlace por correo para restablecerla. Además, se ha introducido un nuevo rol de usuario premium con permisos para gestionar productos y una nueva ruta para cambiar roles a premium o user (/users/premium/).
16. **ENTREGA 16 - Documentar API:** 
17. **ENTREGA 17 - Módulos de testing para proyecto final:**
18. **ENTREGA 18 - Práctica de integración sobre tu ecommerce:**
19. **ENTREGA 19 - Entrega de Proyecto Final:**


## Herramientas implementadas a lo largo del curso:
- **bcrypt (v5.1.1):** Librería para el hashing seguro de contraseñas, utilizada en el almacenamiento seguro de contraseñas mediante el proceso de hash.
- **connect-mongo (v5.1.0):** Almacena sesiones de Express en MongoDB, garantizando la persistencia de sesiones incluso después de reiniciar el servidor.
- **cookie-parser (v1.4.6):** Analiza cookies en solicitudes HTTP, facilitando el manejo y análisis de cookies en Express.
- **express (v4.18.2):** Marco de aplicación web para Node.js, simplifica la creación de servidores y la gestión de rutas y solicitudes HTTP.
- **express-handlebars (v6.0.7):** Sistema de plantillas para Express, utilizado en la generación de vistas HTML dinámicas.
- **express-session (v1.18.0):** Middleware de manejo de sesiones para Express, facilita la creación y gestión de sesiones de usuario.
- **helmet (v7.1.0):** Middleware de seguridad para Express, protege la aplicación mediante la configuración adecuada de encabezados HTTP.
- **jsonwebtoken (v9.0.2):** Implementa generación y verificación de JSON Web Tokens (JWT) para autenticación basada en token.
- **mongoose (v8.2.0):** Biblioteca ODM para MongoDB y Node.js, simplifica la interacción con bases de datos MongoDB.
- **mongoose-paginate-v2 (v1.8.0):** Proporciona paginación para consultas MongoDB utilizando Mongoose.
- **passport (v0.7.0):** Middleware de autenticación para Node.js, facilita la autenticación de usuarios mediante diferentes estrategias.
- **passport-github2 (v0.1.12):** Estrategia de autenticación de Passport para GitHub, permite autenticar usuarios mediante cuentas de GitHub.
- **passport-jwt (v4.0.1):** Estrategia de autenticación de Passport para JSON Web Tokens (JWT), utilizado para autenticar usuarios basados en tokens.
- **passport-local (v1.0.0):** Estrategia de autenticación de Passport para la autenticación local de usuarios.
- **session-file-store (v1.5.0):** Almacena sesiones en archivos del sistema, útil para el almacenamiento local de sesiones en desarrollo.


¡Gracias por explorar mi repositorio! 

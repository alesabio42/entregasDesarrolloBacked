# Backend de Gestión de Productos y Carritos

Este es un backend simple para la gestión de productos y carritos utilizando Express y el sistema de archivos para persistencia.

## Estructura de Archivos

src
├── config
│   ├── passport.config.js

├── Dao
│   ├── Managers
│   │   ├── FS (Filesystem)
│   │   │   ├── CardManager.js
│   │   │   └── ProductManager.js


│   │   └── MDB (mongodb)
│   │       ├── CartManager.js
│   │       └── ProductManager.js
│   │       └── ChatManager.js
│   │       └── userManager.js

│   ├── Models
│       ├── carts.model.js
│       ├── chat.model.js
│       └── products.model.js
│       └── user.model.js
│
├── jsonDB
│       ├── carrito.json
│       ├── products.json

├── middleware
│   ├── authentication.middleware.js
│
├── public
│       ├── css
│         ├── cart.css
│         ├── home.css
│         ├── index.css
│         ├── login.css
│         ├── products.css
│         └── realTimeChat.ccs
│         └── realTimeProducts.ccs
│         └── vistaproducts.ccs
│
│       ├── js
│         ├── buttonHandlers.js
│         └── home.js
│         ├── index.js
│         └── realTimeChat.js
│         └── realTimeProducts.js
│         └── vistaproduct.js
│
├── Routes
│   ├── cards.js
│   ├── chats.js
│   └── products.js
│   ├── session.js
│   ├── user.js

└── utils
│   ├── hashBcrypt.js


└── Views
    ├── Layouts
    ├── cart.handlebars     
    ├── chat.handlebars 
    ├── home.handlebars
    ├── index.handlebars
    ├── login.handlebars    
    ├── products.handlebars 
    ├── realTimeProducts.handlebars
    ├── register.handlebars    
    ├── vistaproduct.handlebars 

app.js
package-lock.json
package.json


## Instalación y Ejecución

1. Asegúrate de tener Node.js instalado en tu entorno.

2. Clona el repositorio desde GitHub o descarga el conjunto de archivos en una carpeta local.

3. Abre tu terminal y navega hasta la carpeta donde se encuentran los archivos clonados.

4. Ejecuta el siguiente comando para instalar las dependencias:
    ```bash
    npm install
    ```
5. Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor y ejecutar las pruebas:
    ```bash
    npm run dev
    ```

## USO: 
Ingresa en http://localhost:8080/login 

Se puede probar el rol de admin con el siguiente usuario y contrasea: adminCoder@coder.com - adminCod3r123
# Backend de Gestión de Productos y Carritos

Este es un backend simple para la gestión de productos y carritos utilizando Express y el sistema de archivos para persistencia.

## Estructura de Archivos

src
├── Dao
│   ├── Managers
│   │   ├── FS (Filesystem)
│   │   │   ├── CardManager.js
│   │   │   └── ProductManager.js
│   │   └── MDB (mongodb)
│   │       ├── CartManager.js
│   │       └── ProductManager.js
│   │       └── ChatManager.js
│   ├── Models
│       ├── carts.model.js
│       ├── chat.model.js
│       └── products.model.js
│
├── jsonDB
│       ├── carrito.json
│       ├── products.json
│       
│
├── public
│       ├── css
│         ├── home.css
│         └── realTimeProducts.ccs
│
│       ├── js
│         ├── buttonHandlers.js
│         └── home.js
│         ├── index.js
│         └── realTimeProducts.js
│
├── Routes
│   ├── cards.js
│   └── products.js
│   └── chat.js
└── Views
    ├── Layouts
    ├── chat.handlebars 
    ├── home.handlebars
    ├── index.handlebars
    ├── realTimeProducts.handlebars
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
Ingresa en localhost: 8080 y podras ver el proyecto.
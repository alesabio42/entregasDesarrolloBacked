# Backend de Gestión de Productos y Carritos

Este es un backend simple para la gestión de productos y carritos utilizando Express y el sistema de archivos para persistencia.

## Estructura de Archivos

- `api/`
  - `products.js`: Maneja las rutas y lógica para la gestión de productos.
  - `cards.js`: Maneja las rutas y lógica para la gestión de carritos.
- `app.js`: Archivo principal que inicia el servidor Express y gestiona las rutas.
- `ProductManager.js`: Lógica para la gestión de productos.
- `carrito.json`: Almacena los datos de los carritos.
- `productos.json`: Almacena los datos de los productos.

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
    node app.js
    ```

## Ejemplos de Uso:
### Productos
a- Listar todos los productos:
    Método: GET
    URL: http://localhost:8080/api/products

b- Obtener un producto por ID:
    Método: GET
    URL: http://localhost:8080/api/products/1

c- Agregar un nuevo producto:
Método: POST
URL: http://localhost:8080/api/products
Cuerpo (raw, JSON):   
    {
    "title": "Producto 19",
    "description": "Descripción del Producto 19",
    "price": 240,
    "thumbnail": "Imagen 19",
    "code": "00019",
    "stock": 22
    }

d- Actualizar un producto por ID:
Método: PUT
URL: http://localhost:8080/api/products/1
Cuerpo (raw, JSON) - ajustar las propiedades que desean actualizar, ejemplo:
{
  "title": "Producto Actualizado",
  "price": 24.99
}

e-Eliminar un producto por ID:
Método: DELETE
URL: http://localhost:8080/api/products/1
(Ajusta el número 1 según el ID del producto que deseas eliminar)

### Carritos
a- Crear un nuevo carrito:
Método: POST
URL: http://localhost:8080/api/cards

b- Listar productos de un carrito por ID:
Método: GET
URL: http://localhost:8080/api/cards/1
(Ajusta el número 1 según el ID del carrito existente)

c- Agregar producto a un carrito por ID:
Método: POST
URL: http://localhost:8080/api/cards/1/product/2
(Ajusta los números 1 y 2 según los IDs del carrito y producto, respectivamente)
Cuerpo (raw, JSON):
{
  "quantity": 3
}
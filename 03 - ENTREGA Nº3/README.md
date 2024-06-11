# ENTREGA 3 - Servidor con express
Este repositorio contiene una aplicación simple que implementa un servidor con Express y utiliza una clase `ProductManager` para gestionar productos con persistencia en un archivo JSON. A continuación, encontrarás las instrucciones para ejecutar el proyecto y realizar pruebas.


## Instrucciones de Ejecución

1. Asegúrate de tener Node.js instalado en tu entorno.

2. Clona el repositorio desde GitHub o descarga el conjunto de archivos en una carpeta local.

3. Abre tu terminal y navega hasta la carpeta donde se encuentran los archivos (`ProductManager.js`,`app.js`, `test.js`, y `productos.json`).

4. Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor con Express:
    ```bash
    node app.js
    ```
5. Observa la salida en la consola para verificar el éxito de las operaciones de prueba.

6. Abre tu navegador o utiliza herramientas como Postman para realizar las siguientes pruebas:

Para devolver todos los productos.
http://localhost:8080/products

Para devolver solo los primeros 5 productos.
http://localhost:8080/products?limit=5




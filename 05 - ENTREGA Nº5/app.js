const express = require('express');
const http = require('http');
const { Server: ServerIO } = require('socket.io');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const path = require('path');

const ProductManager = require('./src/managers/ProductManager.js');
const CardManager = require('./src/managers/CardManager.js');
const createCardsRouter = require('./src/routes/cards.js');
const createProductsRouter = require('./src/routes/products.js');

const app = express();
const server = http.createServer(app);
const io = new ServerIO(server);

const port = 8080;

// Crear instancias de las clases ProductManager y CardManager
const productManager = new ProductManager('./src/jsonDB/productos.json');
const cardManager = new CardManager('./src/jsonDB/carrito.json');

// Middleware para configurar la política de seguridad de contenido
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "http://localhost:8080/", "https://cdn.socket.io/"],
    "font-src": ["'self'", "http://localhost:8080/"],
  },
}));



// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = exphbs.create({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para la vista de home
app.get('/home', (req, res) => {
  res.render('home', { products: productManager.products });
});

// Ruta para la vista en tiempo real de productos
app.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.products });
});

// Servir archivos estáticos desde la carpeta 'public' dentro de 'src'
app.use(express.static(path.join(__dirname, 'src', 'public')));





// Socket del lado del servidor
io.on('connection', (socket) => {
  console.log('Cliente conectado');

    // Manejar evento de nuevo producto
              socket.on('newProduct', (newProduct) => {
                productManager.addProduct(newProduct);
                io.emit('updateProducts', productManager.products);
              });

     // Manejar evento de eliminación de producto
              socket.on('deleteProduct', ({ productId }) => {
                const deletedProduct = productManager.deleteProduct(productId);

                if (deletedProduct) {
                  io.emit('deleteProduct', {
                    success: true,
                    deletedProduct: deletedProduct,  // Enviar el objeto del producto eliminado
                  });
                  
                  io.emit('updateProducts', productManager.products); // Actualizar la lista después de eliminar el producto
                } else {
                  io.emit('deleteProduct', {
                    success: false,
                  });
                }
              });


});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

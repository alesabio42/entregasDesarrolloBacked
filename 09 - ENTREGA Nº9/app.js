const express = require('express');
const http = require('http');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const { Server: ServerIO } = require('socket.io');
const cors = require('cors');
const cookieParser = require ('cookie-parser');


//------------------------------SESSION------------------------------

const FileStore = require('session-file-store')

const sessionRouter = require('./src/routes/session');

/// passport estrategias para el sessions
const session = require ('express-session');
const passport = require('passport')
const MongoStore = require('connect-mongo')
const { initializePassport } = require('./src/config/passport.config')



//------------------------------MODELS------------------------------
const { productModel } = require('./src/dao/models/products.model');
const Messages = require('./src/dao/models/chat.model');
const cartModel = require('./src/dao/models/carts.model'); 


//------------------------------MANAGERS------------------------------
const ProductManager = require('./src/dao/managers/MDB/ProductManager');
const CartManager = require('./src/dao/managers/MDB/CartManager'); 


//------------------------------ROUTERS------------------------------
const createCartsRouter = require('./src/routes/carts');
const cartsRouter = createCartsRouter(new CartManager());
const chatRouter = require('./src/routes/chat');


//------------------------------GESTOR------------------------------
const productManager = new ProductManager(productModel);
const cartManager = new CartManager();



const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = new ServerIO(server, {
  cors: {
    origin: '*',
  },
});



// ----------------------------------------------Conexión a la base de datos----------------------------------------------------
(async () => {
  try {
    await mongoose.connect('mongodb+srv://alejandrosabio24:aslaebio12344321@alejandrosabio.fo2mcjv.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
  }
})();

//  ------------------------------Middleware para configurar la política de seguridad de contenido ------------------------------
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://cdn.socket.io/"],
      "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],

    },
  })
);



//  ------------------------------------------------------------Middleware-------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('cookiefirmada'));

//  -----------------------------------------------------Configuración de Handlebars ------------------------------------------
const hbs = exphbs.create({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');





//  --------------------------------------------------CONFIGURACION DE SESSION ------------------------------

initializePassport()
app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://alejandrosabio24:aslaebio12344321@alejandrosabio.fo2mcjv.mongodb.net/ecommerce?retryWrites=true&w=majority',
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      },
      ttl: 15000000000 * 24
  }), 
  secret: 's3cr3t0',
  resave: true,
  saveUninitialized: true,
}))


app.use(passport.initialize())
app.use(passport.session())


//  --------------------------------------------------Rutas principales u otras rutas ------------------------------


app.use('/session', sessionRouter);

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.get('/', (req, res) => {
  const user = req.session.user;
  res.render('index', { user });
});

app.get('/home', (req, res) => {
  res.render('home', { products: productManager.products });
});

app.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.products });
});

app.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const result = await productManager.getProducts({ limit, page });

    const user = req.session.user;

    res.render('products', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      currentLimit: limit,
      user,  // Pasar el usuario a la vista
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});
app.post('/vistaproduct', async (req, res) => {
  try {
      const productId = req.body.productId;

      // Obtén el producto específico según el ID
      const product = await productManager.getProductById(productId);

      // Verifica el stock del producto
      console.log('Product details:', product);

      // Renderiza la vista con la información del producto
      res.render('vistaproduct', { product });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.post('/add-to-cart', async (req, res) => {
  try {
      const userId = 'userIdDummy'; // ojo el usuariooooooooooooo
      const productId = req.body.productId;
      const quantity = req.body.quantity;


      const cart = await cartManager.addProductToCart(userId, productId, quantity);

      // Devuelve una respuesta JSON indicando el éxito
      res.json({ success: true });

  } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});



app.use('/chat', chatRouter);


// Rutas del carrito
app.get('/cart', async (req, res) => {
  try {
      const userId = 'userIdDummy'; // Reemplazar esto con la forma adecuada de obtener el ID del usuario, todavia no implementamos login
      const cartContent = await cartManager.getCartByUserId(userId);

      if (cartContent) {
          console.log('Cart Content:', cartContent);
          res.render('cart', { cartContent });
      } else {
          res.status(500).json({ error: 'Error al cargar el carrito.' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cargar el carrito.' });
  }
});


//  -----------------------------------------------------Servir archivos estáticos -------------------------------------------------
app.use(express.static(path.join(__dirname, 'src', 'public')));





// ---------------------------------------------------Socket del lado del servidor ----------------------------------------------------
io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  // Lógica para productos
  // Obtener la lista de productos y enviarla al cliente cuando se conecta
  const productList = await productManager.getProducts();
  io.to(socket.id).emit('updateProducts', productList);

  // Manejar evento de nuevo producto
  socket.on('newProduct', async (newProduct) => {
    await productManager.addProduct(newProduct);
    const updatedProductList = await productManager.getProducts();
    io.emit('updateProducts', updatedProductList);
  });

  // Manejar evento de eliminación de producto
  socket.on('deleteProduct', async ({ productId }) => {
    const result = await productManager.deleteProduct(productId);
    if (result.success) {
      const updatedProductList = await productManager.getProducts();
      io.emit('updateProducts', updatedProductList);
    }
    io.to(socket.id).emit('deleteProduct', result);
  });





  //---------------- LOGICA PARA MENSAJES------------------

  // Obtener mensajes existentes y enviarlos al cliente recién conectado
  try {
    const messages = await Messages.find();
    socket.emit('messages', messages);
  } catch (error) {
    console.error('Error al obtener mensajes existentes:', error.message);
  }

  // Manejar nuevo mensaje del chat
  socket.on('chatMessage', async ({ user, message }) => {
    try {
      const newMessage = new Messages({ user, message });
      await newMessage.save();
      io.emit('chat', newMessage);
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error.message);
    }
  
  });


});


// Iniciar el servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

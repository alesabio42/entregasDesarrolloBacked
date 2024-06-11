// RUTA:  src/routes/carts.js
const express = require('express');
const router = express.Router();

function createCartsRouter(cartManager) {
  // Rutas para carritos
  router.post('/', async (req, res) => {
    try {
      const userId = req.body.userId;
      const newCart = await cartManager.createCart(userId);
      res.json({ cartId: newCart._id, message: 'Carrito creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito', details: error.message });
    }
  });

  router.get('/:cid', async (req, res) => {
    try {
      const userId = req.params.cid;
      const cart = await cartManager.getCartByUserId(userId);

      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos del carrito', details: error.message });
    }
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const userId = req.params.cid;
      const productId = req.params.pid;
      const quantity = parseInt(req.body.quantity) || 1;

      const cart = await cartManager.addProductToCart(userId, productId, quantity);

      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito', details: error.message });
    }
  });

  return router;
}

module.exports = createCartsRouter;

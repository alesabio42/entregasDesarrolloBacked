const express = require('express');
const router = express.Router();

function createCartsRouter(cartManager) {
  // Rutas para carritos
  router.post('/', async (req, res) => {
    try {
      const userId = req.body.userId;  // Asegúrate de tener un campo userId en la solicitud
      const newCart = await cartManager.createCart(userId);
      res.json(newCart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  });

  router.get('/:cid', async (req, res) => {
    try {
      const userId = req.params.cid;  // Cambiado de cardId a userId para que coincida con el campo en el modelo
      const cart = await cartManager.getCartByUserId(userId);

      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const userId = req.params.cid;  // Cambiado de cardId a userId para que coincida con el campo en el modelo
      const productId = req.params.pid;
      const quantity = req.body.quantity || 1;

      const cart = await cartManager.addProductToCart(userId, productId, quantity);

      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  });

  return router;
}

module.exports = createCartsRouter;

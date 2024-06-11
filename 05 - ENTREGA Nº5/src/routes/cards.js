const express = require('express');
const router = express.Router();

function createCardsRouter(cardManager) {
  // Rutas para carritos
  router.post('/', async (req, res) => {
    try {
      const newCard = await cardManager.createCard();
      res.json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  });

  router.get('/:cid', async (req, res) => {
    try {
      const cardId = parseInt(req.params.cid);
      const card = await cardManager.getCardById(cardId);

      if (card) {
        res.json(card.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cardId = parseInt(req.params.cid);
      const productId = parseInt(req.params.pid);
      const quantity = req.body.quantity || 1;

      const card = await cardManager.addProductToCard(cardId, productId, quantity);

      if (card) {
        res.json(card);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  });

  return router;
}

module.exports = createCardsRouter;

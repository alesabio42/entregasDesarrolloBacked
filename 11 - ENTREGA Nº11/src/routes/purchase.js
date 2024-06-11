// RUTA RELATIVA: src/routes/purchase.routes.js

const express = require('express');
const router = express.Router();
const PurchaseManager = require('../dao/managers/MDB/PurchaseManager');

const purchaseManager = new PurchaseManager();

// Ruta para realizar una compra

router.post('/', async (req, res) => {
  const { userId } = req.body; // Solo se extrae el userId del cuerpo de la solicitud
  console.log('ID del usuario:', userId);

  if (!userId) {
    return res.status(400).json({ error: 'Se requiere el ID de usuario para realizar la compra.' });
  }

  const ticket = await purchaseManager.createPurchaseTicket(userId); // Solo se envía el userId a la función

  if (ticket) {
    return res.status(201).json({ ticket });
  } else {
    return res.status(500).json({ error: 'No se pudo completar la compra.' });
  }
});

module.exports = router;
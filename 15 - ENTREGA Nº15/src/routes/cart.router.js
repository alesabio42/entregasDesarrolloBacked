// cart.router.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authTokenMiddleware } = require('../utils/jsonwebtoken');
const { auth } = require('../middleware/authetication.middleware');
const verifyRole = require('../middleware/verifyRole.middleware');

const roleMiddleware = [auth, verifyRole(['user', 'premium'])];

router.get('/', authTokenMiddleware, roleMiddleware, cartController.getCart);
router.post('/add-to-cart', authTokenMiddleware,roleMiddleware, cartController.addToCart);


module.exports = router;

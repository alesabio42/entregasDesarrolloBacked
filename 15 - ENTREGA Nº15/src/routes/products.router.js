// RUTA DE ACCESO: src/routes/products.router.js -- PARA EL CARRITO

// src/routes/productRoutes.js

const express = require('express');
const { auth } = require('../middleware/authetication.middleware');
const verifyRole = require('../middleware/verifyRole.middleware');
const ProductManager = require('../dao/managers/MDB/ProductManager'); // Ajusta la importación según tu estructura
const logger = require('../utils/logger'); // Ajusta la importación según tu estructura

const roleMiddleware = [auth, verifyRole(['user', 'premium'])];
const router = express.Router();
const productManager = new ProductManager();

router.get('/products', roleMiddleware, async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const result = await productManager.getProducts({ limit, page });

        const user = req.user;

        res.render('products', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            currentLimit: limit,
            user,  
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.post('/vistaproduct', async (req, res) => {
    try {
        const productId = req.body.productId;

        // Obtén el producto específico según el ID
        const product = await productManager.getProductById(productId);

        // Renderiza la vista con la información del producto
        res.render('vistaproduct', { product });

    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

module.exports = router;

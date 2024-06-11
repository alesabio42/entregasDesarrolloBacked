// RUTA DE ACCESO: src/routes/product.router.js -- PARA EL INVENTARIO

const express = require('express');
const ProductController = require('../controllers/product.controller');
const { auth } = require('../middleware/authetication.middleware');
const verifyRole = require('../middleware/verifyRole.middleware');
const roleMiddleware = [auth, verifyRole(['admin', 'premium'])];
const router = express.Router();

const productController = new ProductController();


router.get('/', roleMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { products, hasPrevPage, hasNextPage, prevPage, nextPage } = await productController.getProducts(page);
        const pagination = { hasPrevPage, hasNextPage, prevPage, nextPage, page };
        res.render('inventario', { products, pagination });
    } catch (error) {
        console.error('Error al obtener los datos de los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.route('/:pid')
    .get(roleMiddleware, productController.getProductById.bind(productController)) // Obtener un  por su ID
    .put(roleMiddleware, productController.updateProduct.bind(productController)) // Actualizar un producto existente por su ID
    .delete(roleMiddleware, productController.deleteProduct.bind(productController)); // Eliminar un usuario existente por su ID

router.route('/')
    .post(roleMiddleware, productController.createProduct.bind(productController)); // Crear un nuevo producto

module.exports = router;


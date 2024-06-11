// RUTA DE ACCESO: src/controllers/productController.js

const { productService } = require('../repositories/index');
const { createHash } = require('../utils/hashBcrypt');

class ProductController {
    constructor() {
        this.service = productService;
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const newProduct = await this.service.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }
    }

    async getProducts(page = 1) {
        try {
            const options = { page, limit: 10 };
            const result = await this.service.getProductsPaginate(options);
            return result;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw new Error('Error interno del servidor');
        }
    }
    
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.service.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
        }
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params;
        const productData = req.body;
        try {
            const result = await this.service.updateProduct(pid, productData);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params; 
        try {
            const result = await this.service.deleteProduct(pid); 
            res.send(result);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    async increaseProductStock(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const result = await this.service.increaseProductStock(id, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error al aumentar el stock del producto', error: error.message });
        }
    }

    async reduceProductStock(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const result = await this.service.reduceProductStock(id, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error al reducir el stock del producto', error: error.message });
        }
    }
}

module.exports = new ProductController();

const express = require('express');
const router = express.Router();

// Utiliza el enrutador para manejar las rutas de productos

function createProductsRouter(productManager) {
  // Ruta raíz GET para listar todos los productos
  router.get('/', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  // Ruta GET /:pid para obtener un producto por su ID
  router.get('/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      const product = await productManager.getProductById(productId);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });

  // Ruta raíz POST para agregar un nuevo producto
  router.post('/', async (req, res) => {
    try {
      const productData = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud en formato JSON
      const newProduct = await productManager.addProduct(productData);
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });

  // Ruta PUT /:pid para actualizar un producto por su ID
  router.put('/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      const updatedFields = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud en formato JSON
      const updatedProduct = await productManager.updateProduct(productId, updatedFields);

      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });

  // Ruta DELETE /:pid para eliminar un producto por su ID
  router.delete('/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      await productManager.deleteProduct(productId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

  return router;
}

module.exports = createProductsRouter;

const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.nextProductId = 1;

    // Cargar productos desde el archivo al instanciar la clase
    this.loadProducts();
  }

  async addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;

    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.error("Todos los campos son obligatorios");
      return null;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Ya existe un producto con el mismo código");
      return null;
    }

    const product = {
      id: this.nextProductId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    await this.saveProducts();
    return product;
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.saveProducts();
      return this.products[index];
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProducts();
    } else {
      console.error("Producto no encontrado");
    }
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
      this.nextProductId = Math.max(...this.products.map((product) => product.id), 0) + 1;
    } catch (error) {
      console.warn("No se pudo cargar el archivo de productos:", error.message);
    }
  }

  async saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data, 'utf8');
    } catch (error) {
      console.error("Error al guardar el archivo de productos:", error.message);
    }
  }
}

module.exports = ProductManager;

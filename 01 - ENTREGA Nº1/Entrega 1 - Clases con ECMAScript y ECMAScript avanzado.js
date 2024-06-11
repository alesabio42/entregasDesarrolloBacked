class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1; // Para generar ID autoincrementables
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.error("Todos los campos son obligatorios");
      return null;
    }

// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

// Se agregan validaciones para asegurarse de que todos los campos necesarios (title, description, price, thumbnail, code, stock) estén presentes al agregar un producto.

    // Para validar que no se repita el campo "code" 
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
    return product;
  }



//----------------------getProductById para mostrar un error si no se encuentra el producto-------------//
// El método verifica si el producto se encontró (if (product)) y, si no se encuentra, imprime un mensaje de error en la consola.

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Descripción 1", 19.99, "img1.jpg", "001", 50);
productManager.addProduct("Producto 2", "Descripción 2", 29.99, "img2.jpg", "002", 30);

console.log(productManager.getProducts());
console.table(productManager.getProducts());

const productById = productManager.getProductById(1);
console.log("Producto con ID 1:", productById);

const productByIdNotFound = productManager.getProductById(999);
// Se imprimirá un mensaje de error en la consola indicando que el producto no fue encontrado.

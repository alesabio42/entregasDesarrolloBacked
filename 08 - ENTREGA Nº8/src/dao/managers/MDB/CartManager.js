// RUTA RELATIVA: src/dao/managers/MDB/CartManager.js

const { cartModel } = require('../../models/carts.model');  
const { productModel } = require('../../models/products.model'); 
const ProductManager = require('../MDB/ProductManager');  

class CartManager {
  constructor() {
    this.productManager = new ProductManager();
  }

//------------------------------------CREAR CARRITO------------------------------------//
  async createCart(userId) {
    try {
      const newCart = await cartModel.create({
        userId,
        products: [],
        total: 0, 
      });
      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito:", error.message);
      return null;
    }
  }

//------------------------------------TRAER CARRITO SEGUN ID------------------------------------//
  async getCartByUserId(userId) {
    try {
        const cart = await cartModel
            .findOne({ userId })
            .populate('products.productId');

        if (!cart) {
            return null;
        }

        return cart;
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
        return null;
    }
}

//------------------------------------AGREGAR PRODUCTOS AL CARRITO------------------------------------//
  
  async addProductToCart(userId, productId, quantity) {
    try {
      let cart = await cartModel.findOne({ userId });

      if (!cart) {
        cart = await this.createCart(userId);
      }

      const existingProduct = cart.products.find((product) => product.productId.id === productId);

      // Asegurarse de que no exceda el stock disponible
      const stockAvailable = await this.getProductStock(productId);
      const requestedQuantity = existingProduct ? existingProduct.quantity + quantity : quantity;

      if (requestedQuantity > stockAvailable) {
        console.log(`No hay suficiente stock disponible. Stock actual: ${stockAvailable}`);
        return null; 
      }

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      // Calcular el total del carrito
      cart.total = await this.calculateCartTotal(cart);

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      return null;
    }
  }


//------------------------------------OBTENER STOCK DE PRODUCTOS------------------------------------//

  async getProductStock(productId) {
    try {
      const product = await this.productManager.getProductById(productId);
      return product ? product.stock : 0;
    } catch (error) {
      console.error("Error al obtener el stock del producto:", error.message);
      return 0;
    }
  }


//------------------------------------CALCULAR EL TOTAL DEL CARRITO------------------------------------//
  async calculateCartTotal(cart) {
    let total = 0;

    for (const product of cart.products) {
      const productPrice = await this.getProductPrice(product.productId);
      total += productPrice * product.quantity;
    }

    return total;
  }


//------------------------------------OBTENER EL PRECIO------------------------------------//
  async getProductPrice(productId) {
    try {
      const product = await this.productManager.getProductById(productId);
      return product ? product.price : 0;
    } catch (error) {
      console.error("Error al obtener el precio del producto:", error.message);
      return 0;
    }
  }
}

module.exports = CartManager;

const productModel = require('../models/productModel');

// Crear producto (POST)
exports.createProduct = (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'El nombre y el precio son obligatorios.' });
  }

  const newProduct = { name, description, price, stock, category };

  productModel.createProduct(newProduct, (err, result) => {
    if (err) {
      console.error('Error al registrar producto:', err);
      return res.status(500).json({ message: 'Error al registrar el producto.' });
    }
    res.status(201).json({
      message: 'Producto registrado exitosamente.',
      productId: result.insertId,
    });
  });
};

// Obtener producto por ID (GET)
exports.getProductById = (req, res) => {
  const { id } = req.params;

  productModel.findProductById(id, (err, product) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ message: 'Error al obtener los detalles del producto.' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json(product);
  });
};
const productModel = require('../models/productModel');

// Crear producto (POST)
exports.createProduct = (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'El nombre y el precio son obligatorios.' });
  }

  const newProduct = { name, description, price, stock, category };

  productModel.createProduct(newProduct, (err, result) => {
    if (err) {
      console.error('Error al registrar producto:', err);
      return res.status(500).json({ message: 'Error al registrar el producto.' });
    }
    res.status(201).json({
      message: 'Producto registrado exitosamente.',
      productId: result.insertId,
    });
  });
};

// Obtener producto por ID (GET)
exports.getProductById = (req, res) => {
  const { id } = req.params;

  productModel.findProductById(id, (err, product) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ message: 'Error al obtener los detalles del producto.' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json(product);
  });
};

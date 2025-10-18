const express = require('express');
const router = express.Router();
const { createProduct, getProductById } = require('../controllers/productController');

// Registrar un producto
router.post('/', createProduct);

// Obtener producto por ID
router.get('/:id', getProductById);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createProduct, getProductById } = require('../controllers/productController');

// Registrar un producto
router.post('/', createProduct);

// Obtener producto por ID
router.get('/:id', getProductById);

module.exports = router;

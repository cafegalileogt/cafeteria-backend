const { order, orderByUserId, orderDetailsByOrderId, orderStatusUpdate  } = require('../controllers/orderController');
const { authUser } = require('../controllers/authController');

const router = require('express').Router();

// Crear una nueva orden
router.post('/create', authUser, order);

// Historial de órdenes por ID de usuario
router.get('/historial/:usuarioId', authUser, orderByUserId);
// Detalles de la orden por número de orden
router.get('/detalle/:numero_orden', authUser, orderDetailsByOrderId);
// Actualizar estado de la orden
router.patch('/actualizar_estado/:numero_orden', authUser, orderStatusUpdate);

module.exports = router;
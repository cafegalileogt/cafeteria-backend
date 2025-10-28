const { order, orderList, orderByUserId, orderDetailsByOrderId, orderStatusUpdate, getOrderbyOrderId  } = require('../controllers/orderController');
const { authUser } = require('../controllers/authController');

const router = require('express').Router();

// Crear una nueva orden
router.post('/create', authUser, order);

// Historial de órdenes por ID de usuario
router.get('/historial/:usuarioId', authUser, orderByUserId);
// Lista de todas las órdenes
router.get('/list', authUser, orderList);
// Detalles de la orden por número de orden
router.get('/detalle/:numero_orden', authUser, orderDetailsByOrderId);
// Actualizar estado de la orden
router.patch('/actualizar_estado/:numero_orden', authUser, orderStatusUpdate);

router.patch('/getOrderbyId/:numero_orden', authUser, getOrderbyOrderId);



module.exports = router;
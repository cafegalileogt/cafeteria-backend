// Order Controller
const { createOrder, getOrderUserById, getOrderDetailsByOrderId, updateOrderStatus } = require('../models/orderModel');

// Create a new order
const order = async (req, res) => {

    try {
        
        const { order, details } = req.body;

        if (!order || !details) {
            return res.status(400).json({ error: 'Faltan datos de la orden' });
        }

        const { total, numero_orden } = order;

        if (!Array.isArray(details) || details.length === 0) {
            return res.status(400).json({ error: 'El detalle de la orden debe ser un arreglo con al menos un producto' });
        }

        const newOrden = {
            id_usuario: req.user?.id_usuario, // Obtener el ID del usuario autenticado
            total,
            numero_orden,
        };

        const result = await createOrder(newOrden, details);
        res.status(201).json({ message: 'Orden creada exitosamente', ordenId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const orderByUserId = async (req, res) => {

    try {

        const usuarioId = req.params.usuarioId
        if (!usuarioId) {
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }

        const orden = await getOrderUserById(usuarioId);
        res.status(200).json(orden);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const orderDetailsByOrderId = async (req, res) => {

    try {
        const { numero_orden } = req.params;

        if (!numero_orden) {
            return res.status(400).json({ error: 'Falta el número de orden' });
        }

        const detalles = await getOrderDetailsByOrderId(numero_orden);
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const orderStatusUpdate = async (req, res) => {
    try {
        const { numero_orden } = req.params;
        const { estado, id_personal } = req.body;

        if (!numero_orden || !estado || !id_personal) {
            return res.status(400).json({ error: 'Faltan datos para actualizar el estado de la orden (numero_orden, estado, id_personal)' });
        }

        const result = await updateOrderStatus(numero_orden, estado, id_personal);
        res.status(200).json({ message: 'Estado de la orden actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    order,
    orderByUserId,
    orderDetailsByOrderId,
    orderStatusUpdate
};
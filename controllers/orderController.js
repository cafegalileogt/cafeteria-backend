// Order Controller
const { createOrder } = require('../models/orderModel');

// Create a new order
const orden = async (req, res) => {

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
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    orden
};
const {
    createOrder,
    getOrder,
    getOrderUserById,
    getOrderDetailsByOrderId,
    updateOrderStatus
  } = require('../models/orderModel');
  
  // Crear orden
  const order = async (req, res) => {
    try {
      const { order, details } = req.body;
      if (!order || !details) return res.status(400).json({ error: 'Faltan datos de la orden' });
  
      const newOrden = {
        id_usuario: req.user?.id_usuario,
        total: order.total,
        numero_orden: order.numero_orden
      };
  
      const result = await createOrder(newOrden, details);
      res.status(201).json({ message: 'Orden creada exitosamente', ordenId: result.orderId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Listar órdenes del día
  const orderList = async (req, res) => {
    console.log("datos")
    try {
      const orders = await getOrder();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Órdenes por usuario
  const orderByUserId = async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId;
      if (!usuarioId) return res.status(400).json({ error: 'Falta el ID del usuario' });
  
      const orden = await getOrderUserById(usuarioId);
      res.status(200).json(orden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Detalles de orden
  const orderDetailsByOrderId = async (req, res) => {
    try {
      const { numero_orden } = req.params;
      if (!numero_orden) return res.status(400).json({ error: 'Falta el número de orden' });
  
      const detalles = await getOrderDetailsByOrderId(numero_orden);
      res.status(200).json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getOrderbyOrderId = async (req, res) => {
    try {
      const { numero_orden } = req.params;
      if (!numero_orden) return res.status(400).json({ error: 'Falta el número de orden' });
  
      const orden = await getOrderbyOrderId(numero_orden);
      res.status(200).json(orden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Actualizar estado
  const orderStatusUpdate = async (req, res) => {
    try {
      const { numero_orden } = req.params;
      const { estado } = req.body;
      const id_personal = 2;
      console.log('id_personal', id_personal);
      console.log('numero_orden',numero_orden);
      if (!numero_orden || !estado || !id_personal)
        return res.status(400).json({ error: 'Faltan datos para actualizar el estado' });
  
      await updateOrderStatus(numero_orden, estado, id_personal);
      res.status(200).json({ message: 'Estado actualizado' });
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    order,
    orderList,
    orderByUserId,
    orderDetailsByOrderId,
    orderStatusUpdate,
    getOrderbyOrderId
  };
  
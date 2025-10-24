const db = require('../config/db');

const createOrder = async (order, details) => {
  const connection = await new Promise((resolve, reject) => {
    db.getConnection((err, conn) => {
      if (err) reject(err);
      else resolve(conn);
    });
  });

  try {
    await new Promise((resolve, reject) => {
      connection.beginTransaction(err => (err ? reject(err) : resolve()));
    });

    // Insertar orden
    const orderResult = await new Promise((resolve, reject) => {
      connection.query('INSERT INTO orden SET ?', order, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    // Insertar detalles
    const detailPromises = details.map(detail => {
      detail.numero_orden = order.numero_orden;
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO detalle_orden SET ?', detail, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    });

    await Promise.all(detailPromises);

    await new Promise((resolve, reject) => {
      connection.commit(err => (err ? reject(err) : resolve()));
    });

    return { orderId: order.numero_orden, message: 'Orden creada exitosamente' };
  } catch (error) {
    await new Promise(resolve => connection.rollback(() => resolve()));
    throw error;
  } finally {
    connection.release();
  }
};

const getOrderUserById = async (usuarioId) => {
  const sql = `SELECT 
                o.numero_orden,
                o.fecha,
                o.estado,
                COALESCE(SUM(d.cantidad), 0) AS total_cantidad,
                o.total
            FROM orden AS o
            LEFT JOIN detalle_orden AS d ON o.numero_orden = d.numero_orden

            WHERE o.id_usuario = ?

            GROUP BY o.numero_orden, o.fecha, o.estado, o.total`;
  return new Promise((resolve, reject) => {
    db.query(sql, [usuarioId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

const getOrderDetailsByOrderId = async (numero_orden) => {
  const sql = `SELECT 
                d.numero_orden,
                p.id_producto,
                p.nombre,
                p.descripcion,
                d.cantidad,
                d.precio_unitario,
                d.subtotal
            FROM detalle_orden d
            INNER JOIN producto p ON d.id_producto = p.id_producto
            WHERE d.numero_orden = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [numero_orden], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateOrderStatus = async (numero_orden, estado, id_personal) => {
  const sql = 'UPDATE orden SET estado = ?, id_personal = ? WHERE numero_orden = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [estado, id_personal, numero_orden], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = { createOrder, getOrderUserById, getOrderDetailsByOrderId, updateOrderStatus };

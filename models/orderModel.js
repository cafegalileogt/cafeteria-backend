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

module.exports = { createOrder };

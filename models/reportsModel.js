const db = require("../config/db");


//OBTENER TODAS LAS VENTAS POR RANGO DE FECHAS
const findSalesByDatesModel = async (from, to) => {
  const sql = "SELECT DATE(fecha) AS date, COUNT(*) AS orders, SUM(total) AS total FROM orden WHERE estado = 'Entregada' AND DATE(fecha) BETWEEN ? AND ? GROUP BY DATE(fecha) ORDER BY DATE(fecha) ASC";
  return new Promise((resolve, reject) => {
    db.query(sql, [from, to], (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};



//OBTENER TOP 10 PRODUCTOS MAS VENDIDOS EN UN RANGO DE FECHAS
const obtenerTopTenProducts = async (from, to) => {
  const sql = `
      SELECT 
        p.id_producto, 
        p.nombre AS name, 
        SUM(d.cantidad) AS sold_times, 
        ROUND(SUM(d.cantidad * d.precio_unitario), 2) AS total
      FROM orden o
      JOIN detalle_orden d ON o.numero_orden = d.numero_orden
      JOIN producto p ON d.id_producto = p.id_producto
      WHERE o.estado = 'Entregada'
        AND DATE(o.fecha) BETWEEN ? AND ?
      GROUP BY p.id_producto, p.nombre
      ORDER BY sold_times DESC
      LIMIT 10;
    `;
  return new Promise((resolve, reject) => {
    db.query(sql, [from, to], (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};



module.exports = {
    findSalesByDatesModel,
    obtenerTopTenProducts
};
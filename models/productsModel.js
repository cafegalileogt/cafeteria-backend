const db = require('../config/db');


const createProducts = async (product) => {
  const sql = 'INSERT INTO producto SET ?'; 
  return new Promise((resolve, reject) => {
    db.query(sql, product, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findProductById = async (id_producto) => {
  const sql = 'SELECT * FROM producto WHERE id_producto = ?'; 
  return new Promise((resolve, reject) => {
    db.query(sql, [id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

const findAllProductsCategorie = async () => {
  const sql = 'SELECT * FROM producto WHERE estado = 1 AND id_categoria IN (SELECT id_categoria FROM categoria)';
  return new Promise((resolve, reject) => {
    db.query(sql, [], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


const findProductsByCategorie = async (idCategorie) => {
  const sql = 'SELECT * FROM producto WHERE id_categoria = ? AND estado = 1';
  return new Promise((resolve, reject) => {
    db.query(sql, [idCategorie], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};




const updateProductModel = async (setClause, values) => {
  const sql = `UPDATE producto SET ${setClause} WHERE id_producto = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};



const deleteProductModel = async (id_producto) => {
  const sql = 'DELETE FROM producto WHERE id_producto = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};



module.exports = {
  createProducts,
  findProductById, 
  findAllProductsCategorie,
  updateProductModel,
  deleteProductModel
}
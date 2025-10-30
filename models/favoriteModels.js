const db = require("../config/db");

//OBTENER TODOS LOS FAVORITOS
const findAllFavorites = async () => {
  const sql = "SELECT  a.*, b.nombre, b.precio, b.imagen_producto FROM favorito a INNER JOIN producto b ON a.id_producto = b.id_producto";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};


// OBTENER FAVORITO POR ID DE USUARIO Y ID DE PRODUCTO
const findFavoriteByUserIdAndProductId = async (id_usuario, id_producto) => {
  const sql = "SELECT  a.id_usuario, b.nombre, b.precio, b.imagen_producto FROM favorito a INNER JOIN producto b ON a.id_producto = b.id_producto WHERE a.id_usuario = ? AND b.id_producto = ? LIMIT 1";
  return new Promise((resolve, reject) => {
    db.query(sql, [id_usuario, id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


 // OBTENER TODDOS LOS FAVORITOS DE UN USUARIO
const findFavoriteByUserId = async (id_usuario) => {
  const sql = "SELECT  a.id_usuario, b.id_producto, b.nombre, b.precio, b.imagen_producto FROM favorito a INNER JOIN producto b ON a.id_producto = b.id_producto WHERE a.id_usuario = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, id_usuario, (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};


 // PARA AGREGAR FAVORITO CON ID DE USUARIO Y ID DE PRODUCTO
const addFavoriteModel = async (id_usuario, id_producto) => {
  const sql = "INSERT INTO favorito (id_usuario, id_producto) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [id_usuario, id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};


// PARA ELIMINAR FAVORITO CON ID DE USUARIO Y ID DE PRODUCTO
const deleteFavoriteModel = async (id_usuario, id_producto) => {
  const sql = "DELETE FROM favorito WHERE id_usuario = ? AND id_producto = ? ";
  return new Promise((resolve, reject) => {
    db.query(sql, [id_usuario, id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};



module.exports = {
    findAllFavorites,
    findFavoriteByUserIdAndProductId,
    findFavoriteByUserId,
    addFavoriteModel,
    deleteFavoriteModel
}
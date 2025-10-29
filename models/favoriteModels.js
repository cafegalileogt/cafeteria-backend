const db = require("../config/db");

//OBTENER TODOS LOS FAVORITOS
const findAllFavorites = async () => {
  const sql = "SELECT * FROM favorito";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};


// OBTENER FAVORITO POR ID DE USUARIO Y ID DE PRODUCTO
const findFavoriteByUserIdAndProductId = async (id_usuario, id_producto) => {
  const sql = "SELECT * FROM favorito WHERE id_usuario = ? AND id_producto = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id_usuario, id_producto], (err, results) => {
      if (err) reject(err);
      else resolve(results.length > 0 ? results[0] : null);
    });
  });
};


 // OBTENER TODDOS LOS FAVORITOS DE UN USUARIO
const findFavoriteByUserId = async (id_usuario) => {
  const sql = "SELECT * FROM favorito WHERE id_usuario = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, id_usuario, (err, results) => {
      if (err) reject(err);
      else resolve(results); // devolver todos los resultados
    });
  });
};


module.exports = {
    findAllFavorites,
    findFavoriteByUserIdAndProductId,
    findFavoriteByUserId
}
const db = require("../config/db");

// OBTENER TODAS LAS CATEGORIAS PARA PANEL ADMINISTRATIVO
const findAllCategories = async () => {
  const sql = "SELECT * FROM categoria";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// PARA LAS CATEGORIAS EN HOME
const CategoriesHome = async () => {
const sql = `
  SELECT id_categoria, nombre, horario, imagen_categoria FROM categoria WHERE estado = 1;`;  
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findCategoriesById = async (id_categoria) => {
  const sql = "SELECT * FROM categoria WHERE id_categoria = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id_categoria], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


// PARA CREAR UNA CATEGORIA EN EL PANEL ADMINISTRATIVO
const creatCategoryModel = async (category) => {
  const sql = "INSERT INTO categoria SET ?";
  return new Promise((resolve, reject) => {
    db.query(sql, category, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// BUSCAR CATEGORIA POR NOMBRE
const findCategoryByName = async (nombre) => {
  const sql = "SELECT * FROM categoria WHERE nombre = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, nombre, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Modelo para actualizar categoría
const updateCategoryModel = async (setClause, values) => {
  const sql = `UPDATE categoria SET ${setClause} WHERE id_categoria = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


// Modelo para eliminar categoría por id
const deleteCategoryModel = async (id_categoria) => {
  const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [id_categoria], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};




module.exports = {
  findAllCategories,
  CategoriesHome,
  findCategoriesById,
  creatCategoryModel,
  findCategoryByName,
  deleteCategoryModel,
  updateCategoryModel
};

const jwt = require("jsonwebtoken");
const { findProductsByCategorie, findAllProductsCategorie, updateProductModel, deleteProductModel } = require("../models/productsModel");
require("dotenv").config();
const path = require("path");


const AllByCategories = async (req, res) => {
  
  try {
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;
    
    if (idRole === 1 || idRole === 2) {
      const result = await findAllProductsCategorie();

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay productos" });
      }

      res.status(200).json({ result });
    } else {
      res
        .status(401)
        .json({
          message: "No tiene permisos para ver los productos de las categorias",
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const filtrarByCategories = async (req, res) => {
  const { idCategorie } = req.params;

  try {
    // console. log(req.user);
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    // console.log("id_rol:", req.user.id_rol);
    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;
    
    if (idRole === 1 || idRole === 2) {
      const result = await findProductsByCategorie(idCategorie);

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay productos en la categoria" });
      }

      res.status(200).json( result );
    } else {
      res
        .status(401)
        .json({
          message: "No tiene permisos para ver los productos por categoria",
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.user || !req.user.id_usuario) {
      return res.status(401).json({
        error: "No autenticado. Por favor, inicie sesión para continuar.",
      });
    }

    const usuario = req.user.usuario;
    const idRole = req.user.id_rol;

    if (idRole !== 2 && idRole !== 3) {
      return res.status(401).json({
        message: "No tiene permisos para actualizar productos",
      });
    }

    const id_producto = req.params.id_producto;
    const updates = req.body;

    // Validar que haya al menos un campo a actualizar
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });
    }

    // Validar que los campos recibidos sean solo los permitidos
    const allowedFields = ['nombre', 'precio', 'descripcion', 'estado', 'imagen_producto'];
    const fieldsToUpdate = Object.keys(updates).filter(field => allowedFields.includes(field));

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ message: "No se enviaron campos válidos para actualizar" });
    }

    // Construir los valores para la consulta dinámica
    const values = fieldsToUpdate.map(field => updates[field]);
    const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
    values.push(id_producto); // para el WHERE

    // Ejecutar la actualización usando el modelo
    const result = await updateProductModel(setClause, values);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado o no actualizado" });
    }

    return res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const deleteteProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;

    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;
    
    if (idRole === 2 || idRole === 3) {

      const result = await deleteProductModel(id_producto);

      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado o no Eliminado" });
      }

      res.status(200).json({ message: "Producto Eliminado exitosamente" });
    } else {
      res
        .status(401)
        .json({
          message: "No tiene permisos para eliminar productos",
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  filtrarByCategories,
  AllByCategories,
  updateProduct,
  deleteteProduct
};

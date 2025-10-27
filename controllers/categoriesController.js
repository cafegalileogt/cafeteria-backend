require("dotenv").config();
const e = require("express");
const {
  findAllCategories,
  CategoriesHome,
  findCategoriesById,
  creatCategoryModel,
  findCategoryByName,
  deleteCategoryModel,
  updateCategoryModel
} = require("../models/categoriesModel");

const getCategories = async (req, res) => {
  try {
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;

    if (idRole === 2 || idRole === 3) {
      const result = await findAllCategories();

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No hay Categorias" });
      }

      res.status(200).json({ result });
    } else {
      res.status(401).json({
        message: "No tiene permisos para ver las categorias",
      });
    }
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener las categorías",
    });
  }
};


// para Mostrar categorias en el home
const getCategoriesHome = async (req, res) => {
  try {
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;

    if (idRole === 1 || idRole === 2 || idRole === 3) {
      const result = await CategoriesHome();

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No hay Categorias" });
      }
      res.status(200).json({ result });
    } else {
      res.status(401).json({
        message: "No tiene permisos para ver las categorias",
      });
    }
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener las categorías",
    });
  }
};

const getCategoriesById = async (req, res) => {
  const { idCategorie } = req.params;

  try {
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;

    if (idRole === 2 || idRole === 3) {
      const result = await findCategoriesById(idCategorie);

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No existe la categoria" });
      }

      res.status(200).json(result);
    } else {
      res.status(401).json({
        message: "No tiene permisos para ver la categoria",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCategory = async (req, res) => {
  const { nombre, horario, descripcion, imagen } = req.body;

  try {
    let id_usuario =
      req.user && req.user.id_usuario
        ? req.user.id_usuario
        : res.status(401).json({
            error: "No autenticado. Por favor, inicie sesión para continuar.",
          });

    let usuario = req.user.usuario;
    let idRole = req.user.id_rol;

    if (idRole === 2 || idRole === 3) {
      const existingCategory = await findCategoryByName(nombre);
      if (existingCategory.length > 0)
        return res.status(400).json({ message: "La categoria ya existe" });

      const category = {
        nombre: nombre,
        horario: horario,
        // descripcion: descripcion,
        imagen_categoria: imagen,
      };

      const result = await creatCategoryModel(category);

      if (!result || !result.insertId) {
        return res.status(404).json({ message: "No se creó la categoría" });
      }

      res.status(201).json({
        id_categoria: result.insertId,
        message: "Categoría creada exitosamente",
      });
    } else {
      res.status(401).json({
        message: "No tiene permisos para crear la categoria",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para actualizar categoría
const updateCategory = async (req, res) => {
  try {
    if (!req.user || !req.user.id_usuario) {
      return res.status(401).json({
        error: "No autenticado. Por favor, inicie sesión para continuar.",
      });
    }

    const idRole = req.user.id_rol;
    if (idRole !== 2 && idRole !== 3) {
      return res.status(401).json({
        message: "No tiene permisos para actualizar categorías",
      });
    }

    const id_categoria = req.params.id_categoria;
    const updates = req.body;


    // Validar que haya al menos un campo a actualizar
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });
    }

    // Campos permitidos para actualización
    const allowedFields = ['nombre', 'horario', 'estado', 'imagen_categoria'];

    const fieldsToUpdate = Object.keys(updates).filter(field => allowedFields.includes(field));

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ message: "No se enviaron campos válidos para actualizar" });
    }

    // Construir los valores para la consulta dinámica
    const values = fieldsToUpdate.map(field => updates[field]);
    const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
    values.push(id_categoria); // para el WHERE

    // Ejecutar la actualización usando el modelo
    const result = await updateCategoryModel(setClause, values);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o no actualizada" });
    }

    return res.status(200).json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Controlador para eliminar categoría
const deleteCategory = async (req, res) => {
  try {
    const { id_categoria } = req.params;

    const id_usuario =
      req.user && req.user.id_usuario ? req.user.id_usuario : null;

    if (!id_usuario) {
      return res.status(401).json({
        error: "No autenticado. Por favor, inicie sesión para continuar.",
      });
    }

    const idRole = req.user.id_rol;

    if (idRole === 2 || idRole === 3) {
      const result = await deleteCategoryModel(id_categoria);

      if (!result || result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Categoría no encontrada o no eliminada" });
      }

      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } else {
      return res.status(401).json({
        message: "No tiene permisos para eliminar categorías",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  getCategories,
  getCategoriesHome,
  getCategoriesById,
  postCategory,
  updateCategory,
  deleteCategory
};

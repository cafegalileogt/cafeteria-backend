require("dotenv").config();
const {
  findAllFavorites,
  findFavoriteByUserId,
  findFavoriteByUserIdAndProductId,
  addFavoriteModel,
  deleteFavoriteModel
} = require("../models/favoriteModels");

// para Mostrar todos los favoritos
const getAllFavorites = async (req, res) => {
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
      const result = await findAllFavorites();

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No hay Favoritos" });
      }
      res.status(200).json({ result });
    } else {
      res.status(401).json({
        message: "No tiene permisos para ver los favoritos",
      });
    }
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener los favoritos",
    });
  }
};



// para Mostrar favoritos por ID de usuario
const getFavoritesByUserId = async (req, res) => {
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
      const result = await findFavoriteByUserId(id_usuario);

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Usuario no tiene Favoritos" });
      }
      res.status(200).json({ result });
    } else {
      res.status(401).json({
        message: "No tiene permisos para ver los favoritos",
      });
    }
  } catch (error) {
    console.error("Error al obtener los favoritos del usuario:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener los favoritos del usuario",
    });
  }
};


// para Mostrar favorito por ID de usuario y ID de producto
const getFavoriteByUserIdAndProductId = async (req, res) => {
  try {
    const { id_producto } = req.params;
    let is_favorite = true;

    let id_usuario = req.user && req.user.id_usuario;
    if (!id_usuario) {
      return res.status(401).json({
        error: "No autenticado. Por favor, inicie sesión para continuar.",
      });
    }

    let idRole = req.user.id_rol;

    if ([1, 2, 3].includes(idRole)) {
      const result = await findFavoriteByUserIdAndProductId(id_usuario, id_producto);
      console.log("Resultado del favorito encontrado 1:", result, is_favorite, id_usuario, id_producto);

      if (!result || result.length === 0) {
        is_favorite = false;
        return res.status(404).json({ message: "Producto no marcado como favorito", is_favorite });
      }

      console.log("Resultado del favorito encontrado: 2", result, is_favorite);
      return res.status(200).json({ result, is_favorite });
    } else {
      return res.status(401).json({
        message: "No tiene permisos para ver los favoritos",
      });
    }
  } catch (error) {
    console.error("Error al obtener producto favorito de usuario:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener producto favorito de usuario",
    });
  }
};


// para Agregar favorito
const postFavorite = async (req, res) => {
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
    const is_favorite = true;

    if (idRole === 1 || idRole === 2 || idRole === 3) {

      const existingFavorite = await findFavoriteByUserIdAndProductId(id_usuario, id_producto);
      if (existingFavorite && existingFavorite.length > 0) {
        return res.status(409).json({ message: "El producto ya está en favoritos", is_favorite });
      }

      const result = await addFavoriteModel(id_usuario, id_producto);

      if (!result || !result.insertId) {
        return res.status(404).json({ message: "No se agrego a favoritos" });
      }

      res.status(201).json({
        message: "Agregado a favoritos exitosamente", is_favorite
      });
    } else {
      res.status(401).json({
        message: "No tiene permisos para agregar favoritos", 
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// para Eliminar favorito
const deleteFavorite = async (req, res) => {
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

    if (idRole === 1 || idRole === 2 || idRole === 3) {

      const existingFavorite = await findFavoriteByUserIdAndProductId(id_usuario, id_producto);
      if (!existingFavorite || existingFavorite.length === 0) {
        return res.status(404).json({ message: "El producto no está en favoritos" });
      }

      const result = await deleteFavoriteModel(id_usuario, id_producto);

      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ message: "Favorito no encontrado" });
      }

      res.status(200).json({ message: "Favorito Eliminado exitosamente" });
    } else {
      res
        .status(401)
        .json({
          message: "No tiene permisos para eliminar favoritos",
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllFavorites,
  getFavoritesByUserId,
  getFavoriteByUserIdAndProductId,
  postFavorite,
  deleteFavorite
};

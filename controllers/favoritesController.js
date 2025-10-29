require("dotenv").config();
const {
  findAllFavorites,
  findFavoriteByUserId,
  findFavoriteByUserIdAndProductId,
} = require("../models/favoriteModels");

// para Mostrar categorias en el home
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

module.exports = {
  getAllFavorites,
};

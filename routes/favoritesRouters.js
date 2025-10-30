const { authUser } = require('../controllers/authController');
const { getAllFavorites, getFavoritesByUserId, getFavoriteByUserIdAndProductId, postFavorite, deleteFavorite} = require("../controllers/favoritesController");

const router = require('express').Router();

router.get("/getAllFavorites", authUser, getAllFavorites);
router.get("/getFavoritesByUserId", authUser, getFavoritesByUserId);
router.get("/getFavoriteByUserIdAndProductId/:id_producto", authUser, getFavoriteByUserIdAndProductId);
router.post("/postFavorite/:id_producto", authUser, postFavorite);
router.delete("/deleteFavorite/:id_producto", authUser, deleteFavorite);


module.exports = router;
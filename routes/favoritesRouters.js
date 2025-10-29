const { authUser } = require('../controllers/authController');
const { getAllFavorites } = require("../controllers/favoritesController");

const router = require('express').Router();

router.get("/getAllFavorites", authUser, getAllFavorites);

module.exports = router;
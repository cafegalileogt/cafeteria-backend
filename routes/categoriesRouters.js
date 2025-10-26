const { authUser } = require('../controllers/authController');
const { getCategories, getCategoriesHome, getCategoriesById, postCategory, updateCategory, deleteCategory} = require("../controllers/categoriesController");

const router = require('express').Router();


router.get("/getCategories", authUser, getCategories);
router.get("/getCategories/home", authUser, getCategoriesHome);
router.get("/getCategories/:idCategorie", authUser, getCategoriesById);
router.post("/postCategory", authUser, postCategory);
router.patch("/updateCategory/:id_categoria", authUser, updateCategory);
router.delete("/deleteCategory/:id_categoria", authUser, deleteCategory);


module.exports = router;
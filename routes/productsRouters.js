const { authUser } = require('../controllers/authController');
const { filtrarByCategories,  AllByCategories, updateProduct, deleteteProduct} = require("../controllers/productsController");

const router = require('express').Router();

router.get("/productos_by_categorias/:idCategorie", authUser, filtrarByCategories);
router.get("/productos_categorias", authUser, AllByCategories);
router.patch("/update_product/:id_producto", authUser, updateProduct);
router.delete("/delete_product/:id_producto", authUser, deleteteProduct);

module.exports = router;
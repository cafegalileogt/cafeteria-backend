const { authUser } = require('../controllers/authController');
const { crearProduct, getProductById, filtrarByCategories,  AllByCategories, updateProduct, deleteteProduct} = require("../controllers/productsController");

const router = require('express').Router();

router.post("/create_product", authUser, crearProduct);
router.get("/product_by_id/:id_producto", authUser, getProductById);
router.get("/productos_by_categorias/:idCategorie", authUser, filtrarByCategories);
router.get("/productos_categorias", authUser, AllByCategories);
router.patch("/update_product/:id_producto", authUser, updateProduct);
router.delete("/delete_product/:id_producto", authUser, deleteteProduct);

module.exports = router;
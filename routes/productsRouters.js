const express = require("express");
const router = express.Router();
const authenticateToken = require("../controllers/authController").authenticateToken;

const { filtrarByCategories,  AllByCategories, updateProduct, deleteteProduct} = require("../controllers/productsController");

router.get("/productos_by_categorias/:idCategorie", authenticateToken, filtrarByCategories);
router.get("/productos_categorias", authenticateToken, AllByCategories);
router.patch("/update_product/:id_producto", authenticateToken, updateProduct);
router.delete("/delete_product/:id_producto", authenticateToken, deleteteProduct);

module.exports = router;
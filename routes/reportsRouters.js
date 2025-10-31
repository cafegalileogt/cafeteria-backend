const { authUser } = require('../controllers/authController');
const { getAllSalesByDates, getTopTenProductsByDates} = require("../controllers/reportsController");
const router = require('express').Router();


router.get("/getAllSalesByDates", authUser, getAllSalesByDates);
router.get("/getTopTenProductsByDates", authUser, getTopTenProductsByDates);


module.exports = router;
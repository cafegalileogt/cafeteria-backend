const { authUser } = require('../controllers/authController');
const { getAllOrdersByDates,getPeakHours, getAllSalesByDates, getTopTenProductsByDates} = require("../controllers/reportsController");
const router = require('express').Router();


router.get("/getAllOrdersByDates", authUser, getAllOrdersByDates);
router.get("/getPeakHours", authUser, getPeakHours);
router.get("/getAllSalesByDates", authUser, getAllSalesByDates);
router.get("/getTopTenProductsByDates", authUser, getTopTenProductsByDates);


module.exports = router;
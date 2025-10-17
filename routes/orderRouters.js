const { orden } = require('../controllers/orderController');
const { authUser } = require('../controllers/authController');

const router = require('express').Router();

router.post('/create', authUser, orden);

module.exports = router;
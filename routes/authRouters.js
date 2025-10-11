const {  forgotPassword, resetPassword  } = require('../controllers/authController');

const router = require('express').Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
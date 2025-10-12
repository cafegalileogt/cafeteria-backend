const express = require("express");
const { login, logout, forgotPassword, resetPassword, activateAccount  } = require('../controllers/authController');

const router = require('express').Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/activate/:token', activateAccount);





module.exports = router;
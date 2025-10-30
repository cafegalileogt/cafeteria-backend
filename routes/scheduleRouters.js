const { authUser } = require('../controllers/authController');
const { putShedule, getShedule } = require('../controllers/scheduleController');
const express = require('express');
const router = express.Router();

router.put('/updateSchedule/:dia', authUser, putShedule);
router.get('/getSchedule', authUser, getShedule);

module.exports = router;

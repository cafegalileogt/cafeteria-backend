const { authUser } = require('../controllers/authController');
const { putShedule, getShedule, postException, getException, deleteException, verifyScheduleAndExceptions } = require('../controllers/scheduleController');
const express = require('express');
const router = express.Router();

router.put('/updateSchedule/:dia', authUser, putShedule);
router.get('/getSchedule', authUser, getShedule);
router.post('/createException', authUser, postException);
router.get('/getException', authUser, getException);
router.delete('/deleteException/:id', authUser, deleteException);
router.get('/isOpen', authUser, verifyScheduleAndExceptions);

module.exports = router;

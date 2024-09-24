const router = require('express').Router();
const { createMeeting, getMeetings } = require('../controllers/meetingController');
const { verifyToken } = require('../services/middlewire');

router.post('/create-meeting', verifyToken, createMeeting)
router.get('/meetings', verifyToken, getMeetings)

module.exports = router;
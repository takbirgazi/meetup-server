const router = require("express").Router();
const {
  createMeeting,
  getMeetings,
  getMeetingById,
} = require("../controllers/meetingController");
const { verifyToken } = require("../services/middlewire");

router.post("/create-meeting", verifyToken, createMeeting);
router.get("/meetings", verifyToken, getMeetings);
router.get("/meetings/:meetingId", verifyToken, getMeetingById); // New route

module.exports = router;

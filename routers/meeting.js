const router = require("express").Router();
const {
  createMeeting,
  getMeetings,
  getMeetingById,
  joinmeeting,
  getMeetingByEmail,
} = require("../controllers/meetingController");
const { verifyToken } = require("../services/middlewire");

router.post("/create-meeting", verifyToken, createMeeting);
router.get("/meetings", verifyToken, getMeetings);
router.get("/meeting/:meetingId", getMeetingById); // TO DO - get meeting by id for delete and update/edit
router.patch("/meeting/:meetingId", verifyToken, joinmeeting); //  update meeting by id
router.get("/meetings/:email", verifyToken, getMeetingByEmail); // TO DO - get meeting by email for delete and update/edit

// Livekit token endpoint
// router.get("/getToken", getLivekitToken);

module.exports = router;

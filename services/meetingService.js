const { getMeetingCollection } = require("../models/mongoDb");

const handleCreateMeeting = async (req, res) => {
  try {
    const meetingCollection = getMeetingCollection();

    // const { title, description, date, startTime, endTime, participants } = req.body;
    // Instant Meeting & Scheduled Meeting are stored in the same collection
    const meeting = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      meetingLink: req.body.meetingLink,
      meetingId: req.body.meetingId,
      status: req.body.status,
    };

    const result = await meetingCollection.insertOne(meeting);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetMeetings = async (req, res) => {
  try {
    const meetingCollection = getMeetingCollection();
    const result = await meetingCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetMeetingById = async (req, res) => {
  try {
    const meetingCollection = getMeetingCollection();
    const result = await meetingCollection.findOne({
      meetingId: req.params.meetingId,
    });
    console.log(req.params.meetingId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
};

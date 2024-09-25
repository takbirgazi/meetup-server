const { getMeetingCollection } = require("../models/mongoDb");

const handleCreateMeeting = async (req, res) => {
  try {
    const meetingCollection = getMeetingCollection();

    // const { title, description, date, startTime, endTime, participants } = req.body;
    const meeting = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      meetingLink: req.body.meetingLink,
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

module.exports = { handleCreateMeeting, handleGetMeetings };

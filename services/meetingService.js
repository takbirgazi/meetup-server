
const { getMeetingCollection } = require("../models/mongoDb");
const nodemailer = require('nodemailer');

// Email sending function
const sendReminderEmail = (meeting) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: meeting.email,
    subject: 'Meeting Reminder',
    text: `Dear ${meeting.name},\n\nThis is a reminder for your meeting scheduled at ${meeting.date}.\n\nMeeting Link: ${meeting.meetingLink}\n\nThank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email: ${error.message}`);
    } else {
      console.log(`Reminder email sent: ${info.response}`);
    }
  });
};

const handleCreateMeeting = async (req, res) => {
  try {
    const meetingCollection = getMeetingCollection();

    // Create the meeting object from request body
    const meeting = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date, 
      meetingLink: req.body.meetingLink,
      meetingId: req.body.meetingId,
      status: req.body.status,
    };

    // Insert the meeting into the MongoDB collection
    const result = await meetingCollection.insertOne(meeting);
    res.status(201).send(result);

    // Schedule email to be sent 10 minutes before the meeting
    const meetingTime = new Date(meeting.date); 
    const reminderTime = new Date(meetingTime.getTime() - 15 * 60 * 1000); 

    const now = new Date();
    const timeUntilReminder = reminderTime - now;

    // If the meeting is scheduled in the future, set the email reminder
    if (timeUntilReminder > 0) {
      setTimeout(() => sendReminderEmail(meeting), timeUntilReminder);
    }

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

const connectDB = require("../models/mongoDb");
const { getMeetingCollection } = require("../models/mongoDb");
const nodemailer = require("nodemailer");

// Dynamic import for livekit-server-sdk
// let AccessToken;
// (async () => {
//   const livekit = await import("livekit-server-sdk");
//   AccessToken = livekit.AccessToken;
// })();

// Email sending function
const sendReminderEmail = (meeting) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: meeting.hostEmail,
    subject: "Meeting Reminder",
    text: `Dear ${meeting.hostName},

I hope this message finds you well.

This is a friendly reminder regarding your upcoming meeting scheduled on ${meeting.date}. Please find the details below:

Meeting Link: ${meeting.meetingLink}

If you have any questions or need assistance before the meeting, feel free to reach out.

Thank you for your time, and we look forward to your participation.

Best regards,
MeetUp Team`,
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
    const db = await connectDB();
    const meetingCollection = await db.collection('meetings');
    // console.log(req.body);

    // const { title, description, date, startTime, endTime, participants } = req.body;
    // Instant Meeting & Scheduled Meeting are stored in the same collection
    const meeting = {
      date: req.body.date,
      hostName: req.body.participants[0].name,
      hostEmail: req.body.participants[0].email,
      meetingLink: req.body.meetingLink,
      meetingId: req.body.meetingId,
      status: req.body.status,
      participants: req.body.participants.map((participant) => ({
        name: participant.name,
        email: participant.email,
        photoURL: participant.photoURL,
        role: participant.role,
      })),
    };

    const result = await meetingCollection.insertOne(meeting);
    res.status(201).send(result);

    //IMPORTANT: Schedule email to be sent 10 minutes before the meeting

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
    const db = await connectDB();
    const meetingCollection = await db.collection('meetings');
    const result = await meetingCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetMeetingById = async (req, res) => {
  try {
    const db = await connectDB();
    const meetingCollection = await db.collection('meetings');
    const result = await meetingCollection.findOne({
      meetingId: req.params.meetingId,
    });
    // console.log(req.params.meetingId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleJoinMeeting = async (req, res) => {
  try {
    const db = await connectDB();
    const meetingCollection = await db.collection('meetings');
    const query = { meetingId: req.params.meetingId };

    // Check if the meeting exists
    const meeting = await meetingCollection.findOne(query);

    if (!meeting) {
      return res.status(404).send({ error: "Meeting not found." });
    }

    // Initialize the participants array if it doesn't exist
    const participants = meeting.participants || [];

    // Check if the user is already a participant to avoid duplicates
    const participantExists = participants.some(
      (participant) => participant.email === req.body.email
    );

    if (participantExists) {
      return res.status(400).send({ error: "User is already a participant." });
    }

    // Add new participant
    const newParticipant = {
      name: req.body.name,
      email: req.body.email,
      photoURL: req.body.photoURL,
      role: req.body.role,
    };

    // Update the meeting by pushing the new participant into the participants array
    const updateResult = await meetingCollection.updateOne(
      { meetingId: req.params.meetingId }, // Find the meeting
      {
        $push: {
          participants: newParticipant,
        },
      }
    );

    if (updateResult.modifiedCount === 1) {
      return res
        .status(200)
        .send({ message: "Successfully joined the meeting." });
    } else {
      return res.status(500).send({ error: "Failed to join the meeting." });
    }
  } catch (error) {
    console.error("Error joining the meeting:", error);
    res.status(500).send({ error: error.message });
  }
};

// const createToken = async (req, res) => {
//   const roomName = "quickstart-room";
//   const participantName = "quickstart-username";

//   const at = new AccessToken(
//     process.env.LIVEKIT_API_KEY,
//     process.env.LIVEKIT_API_SECRET,
//     {
//       identity: participantName,
//       ttl: "10m",
//     }
//   );
//   at.addGrant({ roomJoin: true, room: roomName });

//   try {
//     const token = await at.toJwt();
//     console.log("Generated Livekit Token:", token); // Log the token

//     // Send the token in the response
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error("Error generating token:", error);
//     res.status(500).json({ error: "Failed to generate token" });
//   }
// };

module.exports = {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
  handleJoinMeeting,
};

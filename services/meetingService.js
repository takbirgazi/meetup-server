const { getMeetingCollection } = require("../models/mongoDb");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// Dynamic import for livekit-server-sdk
// let AccessToken;
// (async () => {
//   const livekit = await import("livekit-server-sdk");
//   AccessToken = livekit.AccessToken;
// })();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Email sending function
const sendReminderEmail = async (meeting) => {
  const emailData = {
    from: `"MeetUp" <${process.env.SENDER_EMAIL}>`,
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

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    console.log(`Reminder email sent: ${msg.id}`);
    return true;
  } catch (err) {
    console.error(`Error sending email: ${err}`);
    return false;
  }
};

const handleCreateMeeting = async (req, res) => {
  try {
    const meetingCollection = await getMeetingCollection();

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

    if (meeting.status === "scheduled") {
      sendReminderEmail(meeting);
    }

    res.status(201).send({ result });
  } catch (error) {
    console.error("Error in handleCreateMeeting:", error);
    res.status(500).send({ error: error.message });
  }
};

const handleGetMeetings = async (req, res) => {
  try {
    const meetingCollection = await getMeetingCollection();
    const result = await meetingCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetMeetingById = async (req, res) => {
  try {
    const meetingCollection = await getMeetingCollection();
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
    const meetingCollection = await getMeetingCollection();
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

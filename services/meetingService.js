const { getMeetingCollection } = require("../models/mongoDb");

const handleCreateMeeting = async (req, res) => {
    try {
        const meetingCollection = getMeetingCollection();
        // console.log(req.body);

        // const { title, description, date, startTime, endTime, participants } = req.body;
        // Instant Meeting & Scheduled Meeting are stored in the same collection
        const meeting = {
            date: req.body.date,
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
        // console.log(req.params.meetingId);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const handleJoinMeeting = async (req, res) => {
    try {
        const meetingCollection = getMeetingCollection();
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
            return res.status(200).send({ message: "Successfully joined the meeting." });
        } else {
            return res.status(500).send({ error: "Failed to join the meeting." });
        }
    } catch (error) {
        console.error("Error joining the meeting:", error);
        res.status(500).send({ error: error.message });
    }
};


module.exports = {
    handleCreateMeeting,
    handleGetMeetings,
    handleGetMeetingById,
    handleJoinMeeting,
};

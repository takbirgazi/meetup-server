const { getMeetingCollection } = require("../models/mongoDb");

const handleCreateMeeting = async (req, res) => {
    try {
        const meetingCollection = getMeetingCollection();

        // const { title, description, date, startTime, endTime, participants } = req.body;
        const meeting = {
            title: 'dsdsd',
            description: 'dsdsd',
            date: 'dsdsd',
            startTime: 'dsdsd',
            endTime: 'dsdsd',
            participants: 'dsdsd'
        }

        const result = await meetingCollection.insertOne(meeting);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const handleGetMeetings = async (req, res) => {
    try {
        const meetingCollection = getMeetingCollection();
        const result = await meetingCollection.find().toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = { handleCreateMeeting, handleGetMeetings };
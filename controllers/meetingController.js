const { handleCreateMeeting, handleGetMeetings } = require("../services/meetingService");

module.exports = {
    createMeeting: handleCreateMeeting,
    getMeetings: handleGetMeetings
}
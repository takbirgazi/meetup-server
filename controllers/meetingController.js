const {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
  handleJoinMeeting,
} = require("../services/meetingService");

module.exports = {
  createMeeting: handleCreateMeeting,
  getMeetings: handleGetMeetings,
  getMeetingById: handleGetMeetingById,
  joinmeeting: handleJoinMeeting,
};

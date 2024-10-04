const {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
  handleJoinMeeting,
  // createToken,
} = require("../services/meetingService");

module.exports = {
  createMeeting: handleCreateMeeting,
  getMeetings: handleGetMeetings,
  getMeetingById: handleGetMeetingById,
  joinmeeting: handleJoinMeeting,
  // getLivekitToken: createToken,
};

const {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
  handleJoinMeeting,
  handleGetMeetingByEmail,
  // createToken,
} = require("../services/meetingService");

module.exports = {
  createMeeting: handleCreateMeeting,
  getMeetings: handleGetMeetings,
  getMeetingById: handleGetMeetingById,
  joinmeeting: handleJoinMeeting,
  getMeetingByEmail: handleGetMeetingByEmail,
  // getLivekitToken: createToken,
};

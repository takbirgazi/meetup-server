const {
  handleCreateMeeting,
  handleGetMeetings,
  handleGetMeetingById,
} = require("../services/meetingService");

module.exports = {
  createMeeting: handleCreateMeeting,
  getMeetings: handleGetMeetings,
  getMeetingById: handleGetMeetingById,
};

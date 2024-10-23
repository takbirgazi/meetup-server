const {
  createTask,
  getTask,
  deleteTask,
  editTask,
} = require("../services/toDoService");

module.exports = {
  get: getTask,
  post: createTask,
  put: editTask,
  delete: deleteTask,
};

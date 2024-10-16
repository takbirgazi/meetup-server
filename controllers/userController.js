const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  loginUser,
  changeOrSetPassword,
} = require("../services/userService");

module.exports = {
  get: getAllUsers,
  post: createUser,
  login: loginUser,
  put: updateUser,
  delete: deleteUser,
  search: searchUser,
  modifyPassword: changeOrSetPassword,
};

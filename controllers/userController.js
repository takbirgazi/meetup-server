const { getAllUsers, createUser, updateUser, deleteUser, searchUser } = require("../services/userService");


module.exports = {
    get: getAllUsers,
    post: createUser,
    put: updateUser,
    delete: deleteUser,
    search: searchUser,
}


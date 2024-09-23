const { getAllUsers, createUser, updateUser, deleteUser } = require("../services/userService");


module.exports = {
    get: getAllUsers,
    post: createUser,
    put: updateUser,
    delete: deleteUser,
}


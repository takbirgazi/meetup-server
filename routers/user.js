const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/users", userController.get);
router.get("/userSearch", userController.search);
router.post("/addUser", userController.post);
router.post("/login", userController.login);
router.put("/updateUser", userController.put);
router.delete("/deleteUser", userController.delete);
router.patch("/changePassword", userController.modifyPassword);

module.exports = router;

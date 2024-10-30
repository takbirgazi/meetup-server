const router = require("express").Router();
const {
  createTask,
  getTask,
  editTask,
  deleteTask,
  getSingleTask,
} = require("../services/toDoService");
const { verifyToken } = require("../services/middlewire");

router.post("/create-task", createTask);
router.get("/tasks", verifyToken, getTask);
router.get("/task/:id", getSingleTask);
router.patch("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;

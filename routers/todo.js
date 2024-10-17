const router = require("express").Router();
const {
  createTask,
  getTask,
  editTask,
  deleteTask,
} = require("../services/toDoService");

router.post("/create-task", createTask);
router.get("/tasks", getTask);
router.patch("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
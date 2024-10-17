const { getToDoCollection, ObjectId } = require("../models/mongoDb");

const createTask = async (req, res) => {
  try {
    const toDoCollection = await getToDoCollection();

    const task = {
      text: req.body.text,
      completed: req.body.completed,
      email: req.body.email,
    };

    const result = await toDoCollection.insertOne(task);
    const insertedTask = await toDoCollection.findOne({
      _id: result.insertedId,
    });
    res.status(201).send(insertedTask);
  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).send({ error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const toDoCollection = await getToDoCollection();
    const result = await toDoCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in getTask:", error);
    res.status(500).send({ error: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const toDoCollection = await getToDoCollection();
    const { id } = req.params;
    const updatedTask = {
      $set: {
        text: req.body.text,
        completed: req.body.completed,
      },
    };

    const result = await toDoCollection.updateOne(
      { _id: new ObjectId(id) },
      updatedTask
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task updated" });
  } catch (error) {
    console.error("Error in editTask:", error);
    res.status(500).send({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const toDoCollection = await getToDoCollection();
    const { id } = req.params;
    const result = await toDoCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    console.error("Error in deleteTask:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTask,
  editTask,
  deleteTask,
};

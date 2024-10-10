const { ObjectId } = require("mongodb");
const { getUserCollection } = require("../models/mongoDb");
const connectDB = require("../models/mongoDb");

// Function to retrieve all users (for GET request)
async function getAllUsers(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users') // Get the user collection

    // Query the collection to find all users
    const users = await userCollection.find({}).toArray();

    // Send the retrieved users as the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in GET request:", error);
    res.status(500).send("Error retrieving users");
  }
}

// Function to create a new user (for POST request)
async function createUser(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users')
    const newUser = req.body;

    // console.log(newUser);
    // res.send({success: true});
    // Insert the new user into the collection
    const result = await userCollection.insertOne(newUser);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error in POST request:", error);
    res.status(500).send("Error creating user");
  }
}

// Function to update a user (for PUT request)
async function updateUser(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users')
    const userId = req.params.id; // Assuming the user ID is passed in the URL
    const updatedData = req.body;

    // Update the user document
    const result = await userCollection.updateOne(
      { _id: userId },
      { $set: updatedData }
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in PUT request:", error);
    res.status(500).send("Error updating user");
  }
}

// Function to delete a user (for DELETE request)
async function deleteUser(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users')
    const userId = req.params.id; // Assuming the user ID is passed in the URL

    // Delete the user document
    const result = await userCollection.deleteOne({ _id: userId });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in DELETE request:", error);
    res.status(500).send("Error deleting user");
  }
}

async function loginUser(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users')
    const user = req.body;

    // Check if user already exists
    const result = await userCollection.findOne({ email: user.email });

    if (result) {
      // If user exists, respond with success
      res
        .status(200)
        .json({ success: true, message: "User already exists", user: result });
    } else {
      // If user does not exist, insert the new user
      const newUser = await userCollection.insertOne(user);
      res
        .status(201)
        .json({ success: true, message: "New user created", user: newUser });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    res.status(500).send("Error handling user login/creation");
  }
}

async function searchUser(req, res) {
  try {
    const db = await connectDB();
    const userCollection = await db.collection('users')
    const email = req.query.email; // Assuming the user ID is passed in the URL

    // Delete the user document
    const result = await userCollection.findOne({ email });

    // res.status(200).json(result);
    // console.log(result);
    if (result) {
      res.status(200).json({ exists: true });
    } else {
      res.status(201).json({ exists: false });
    }
  } catch (error) {
    console.error("Error in DELETE request:", error);
    res.status(500).send("Error deleting user");
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  loginUser,
};

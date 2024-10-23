const { getUserCollection } = require('../models/mongoDb');
const bcrypt = require("bcrypt");

// Function to retrieve all users (for GET request)
async function getAllUsers(req, res) {
  try {
    // const db = await connectDB();
    // const userCollection = await db.collection('users') // Get the user collection
    const userCollection = await getUserCollection(); // Get the user collection

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
    const userCollection = await getUserCollection();
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
    const userCollection = await getUserCollection();
    const userId = req.params.id; // Assuming the user ID is passed in the URL
    const updatedData = req.body;

    // console.log(updatedData)

    // Update the user document
    const result = await userCollection.updateOne(
      { email: updatedData.email },
      {
        $set:
        {
          userName: updatedData?.userName,
          photoURL: updatedData?.photoURL,
        }
      }
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
    const userCollection = await getUserCollection();
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
    const userCollection = await getUserCollection();
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
    const userCollection = await getUserCollection();
    const email = req.query.email; // Assuming email is passed in the URL

    // Find the user by email
    const result = await userCollection.findOne({ email });

    if (result) {
      // Check if the password field is present and not empty
      const hasPassword = result.password.trim() !== "";

      res.status(200).json({ exists: true, hasPassword });
    } else {
      res.status(201).json({ exists: false });
    }
  } catch (error) {
    console.error("Error in searchUser request:", error);
    res.status(500).send("Error searching for user");
  }
}

// Function to change or set a password
async function changeOrSetPassword(req, res) {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const userCollection = await getUserCollection();
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a password set
    if (user.password) {
      // User already has a password - check if currentPassword matches the saved one
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database (partial update)
    await userCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json({ message: user.password ? "Password changed" : "Password set successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Error updating password" });
  }
}


module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  loginUser,
  changeOrSetPassword,
};

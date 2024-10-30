const { getWorkspaceCollection, ObjectId } = require("../models/mongoDb");

const handleCreateWorkspace = async (req, res) => {
    try {
        const workspace = req.body;
        const workspaceCollection = await getWorkspaceCollection();

        isExist = await workspaceCollection.findOne({ name: workspace.taskTitle, email: workspace.taskHost });
        if (isExist) {
            res.status(400).send({ message: "Workspace already exists" });
            return;
        }
        const result = await workspaceCollection.insertOne(workspace);
        res.status(201).send(result);
    }
    catch (error) {
        console.error("Error in createWorkspace:", error);
        res.status(500).send({ error: error.message });
    }
}
const handleGetWorkspaces = async (req, res) => {
}

const handleGetWorkspaceByemail = async (req, res) => {
    try {
        const email = req.body.email;
        // console.log(email)
        const workspaceCollection = await getWorkspaceCollection();
        const result = await workspaceCollection.find({ email: email }).toArray();
        res.status(200).send(result);
    }
    catch (error) {
        console.error("Error in getWorkspaceByEmail:", error);
        res.status(500).send({ error: error.message });
    }
}

const handleUpdateWorkspace = async (req, res) => {
    try {
        const id = req.params.id;
        const workspace = req.body;
        const workspaceCollection = await getWorkspaceCollection();

        const result = await workspaceCollection.updateOne({ _id:  new ObjectId(id) }, { $set: workspace });
        res.status(200).send(result);
    }
    catch (error) {
        console.error("Error in updateWorkspace:", error);
        res.status(500).send({ error: error.message });
    }
}

const handleDeleteWorkspace = async (req, res) => {
    // Delete a workspace
    // Return the deleted workspace
    // If there is an error, return the error 
}


module.exports = {
    handleCreateWorkspace,
    handleGetWorkspaces,
    handleGetWorkspaceByemail,
    handleUpdateWorkspace,
    handleDeleteWorkspace,

}

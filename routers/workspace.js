const { createWorkspace, getWorkspaces, getWorkspaceByEmail, updateWorkspace, deleteWorkspace } = require("../controllers/workspaceController");
const { verifyToken } = require("../services/middlewire");

const router = require("express").Router();

router.post("/workspaces", verifyToken, createWorkspace);
router.get("/workspaces", getWorkspaces);
router.get("/workspaces/:email", verifyToken, getWorkspaceByEmail);
router.put("/workspaces/:id", verifyToken, updateWorkspace);
router.delete("/workspaces/:id", verifyToken, deleteWorkspace);

module.exports = router;
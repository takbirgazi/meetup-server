const { createWorkspace, getWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace } = require("../controllers/workspaceController");

const router = require("express").Router();

router.post("/workspaces", createWorkspace);
router.get("/workspaces", getWorkspaces);
router.get("/workspaces/:id", getWorkspaceById);
router.put("/workspaces/:id", updateWorkspace);
router.delete("/workspaces/:id", deleteWorkspace);

module.exports = router;
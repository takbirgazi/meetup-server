const { handleCreateWorkspace, handleGetWorkspaces, handleGetWorkspaceById, handleUpdateWorkspace, handleDeleteWorkspace } = require("../services/workspaceService");

module.exports = {
    createWorkspace: handleCreateWorkspace,
    getWorkspaces: handleGetWorkspaces,
    getWorkspaceById: handleGetWorkspaceById,
    updateWorkspace: handleUpdateWorkspace,
    deleteWorkspace: handleDeleteWorkspace,
};

const { handleCreateWorkspace, handleGetWorkspaces, handleGetWorkspaceByemail, handleUpdateWorkspace, handleDeleteWorkspace } = require("../services/workspaceService");

module.exports = {
    createWorkspace: handleCreateWorkspace,
    getWorkspaces: handleGetWorkspaces,
    getWorkspaceByEmail:handleGetWorkspaceByemail,
    updateWorkspace: handleUpdateWorkspace,
    deleteWorkspace: handleDeleteWorkspace,
};

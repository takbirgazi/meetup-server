const { opennAIchat } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/chat", opennAIchat);

module.exports = router;
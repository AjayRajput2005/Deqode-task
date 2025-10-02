const express = require("express");
const { sendMessage } = require("../controllers/aiController");
const auth = require("../middleware/auth");

const router = express.Router();

// AI chat route
router.post("/chat", auth, sendMessage);

module.exports = router;
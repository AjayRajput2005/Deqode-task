const express = require("express");
const { createThread, getThreads, getMessages, deleteThread } = require("../controllers/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/threads", auth, createThread);
router.get("/threads", auth, getThreads);
router.get("/threads/:threadId/messages", auth, getMessages);
router.delete("/threads/:id", auth, deleteThread);

module.exports = router;
const Thread = require("../models/thread.model");
const Message = require("../models/message.model");

// Create Thread
exports.createThread = async (req, res) => {
  try {
    const thread = await Thread.create({
      user_id: req.user.id,
      title: req.body.title || "New Chat",
    });
    res.json({ success: true, thread });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ user_id: req.user.id })
      .sort({ last_message_at: -1 });
    res.json({ success: true, threads });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ thread_id: req.params.threadId })
      .populate("sources")
      .sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Thread
exports.deleteThread = async (req, res) => {
  try {
    await Thread.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ thread_id: req.params.id });
    res.json({ success: true, message: "Thread deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
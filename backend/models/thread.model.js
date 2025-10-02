const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    message_count: {
      type: Number,
      default: 0,
    },
    last_message_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

threadSchema.index({ user_id: 1, createdAt: -1 });

module.exports = mongoose.model("Thread", threadSchema);
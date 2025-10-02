const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thinking: String, // For "show thinking" feature
    sources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ thread_id: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
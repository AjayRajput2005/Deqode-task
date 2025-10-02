const mongoose = require("mongoose");
const crypto = require("crypto");

const sourceSchema = new mongoose.Schema(
  {
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    snippet: String,
    url_hash: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create hash before saving for deduplication
sourceSchema.pre("save", function (next) {
  if (this.url && !this.url_hash) {
    this.url_hash = crypto.createHash("md5").update(this.url).digest("hex");
  }
  next();
});

module.exports = mongoose.model("Source", sourceSchema);
const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateCollected: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Waste", WasteSchema);

const mongoose = require("mongoose");
const WasteSchema = new mongoose.Schema({
  type: String,
  weight: Number,
  location: String,
  dateCollected: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Waste", WasteSchema);

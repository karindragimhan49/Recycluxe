const Waste = require("../models/Waste");

// Create
exports.createWaste = async (req, res) => {
  const { type, weight, location } = req.body;

  // 🔐 Basic Validation
  if (!type || !location || typeof weight !== 'number' || weight <= 0) {
    return res.status(400).json({ message: 'All fields are required and weight must be a positive number' });
  }

  try {
    const waste = new Waste({
      type,
      weight,
      location,
      userId: req.user.userId,
    });

    await waste.save();
    res.status(201).json(waste);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read All (user-specific)
exports.getWaste = async (req, res) => {
  try {
    const waste = await Waste.find({ userId: req.user.userId });
    res.json(waste);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update
exports.updateWaste = async (req, res) => {
  try {
    const waste = await Waste.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!waste) return res.status(404).json({ message: "Waste not found" });
    res.json(waste);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete
exports.deleteWaste = async (req, res) => {
  try {
    const waste = await Waste.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!waste) return res.status(404).json({ message: "Waste not found" });
    res.json({ message: "Waste deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

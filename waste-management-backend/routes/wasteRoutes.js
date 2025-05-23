const express = require("express");
const router = express.Router();
const wasteController = require("../controllers/wasteController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, wasteController.createWaste);
router.get("/", auth, wasteController.getWaste);
router.put("/:id", auth, wasteController.updateWaste);
router.delete("/:id", auth, wasteController.deleteWaste);

module.exports = router;

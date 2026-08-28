const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

router.post("/", authMiddleware, addEducation);
router.get("/", authMiddleware, getEducation);
router.put("/:educationId", authMiddleware, updateEducation);
router.delete("/:educationId", authMiddleware, deleteEducation);

module.exports = router;
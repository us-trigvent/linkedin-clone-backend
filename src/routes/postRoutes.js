const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createPost, getUserPosts } = require("../controllers/postController");

router.post("/", authMiddleware, createPost);
router.get("/user/:userId",authMiddleware,getUserPosts);

module.exports = router;
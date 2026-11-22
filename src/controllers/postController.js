const Post = require("../config/models/Post");

const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content && !image) {
      return res.status(400).json({
        success: false,
        message: "Post content or image is required.",
      });
    }

    const post = await Post.create({
      user: req.user.userId,
      content,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId })
      .populate("user", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createPost,
  getUserPosts,
  getAllPosts
};
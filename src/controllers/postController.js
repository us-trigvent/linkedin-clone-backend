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

module.exports = {
  createPost,
};
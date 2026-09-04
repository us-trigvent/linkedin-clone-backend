const User = require("../config/models/User");

const addEducation = async (req, res) => {
  try {
    const { institute, degree, field, startYear, endYear } = req.body;

    if (!institute || !degree || !field || !startYear || !endYear) {
      return res.status(400).json({
        success: false,
        message: "All education fields are required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.education.push({
      institute,
      degree,
      field,
      startYear,
      endYear,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Education added successfully",
      data: user.education[user.education.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEducation = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("education");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateEducation = async (req, res) => {
  try {
    const { educationId } = req.params;

    const { institute, degree, field, startYear, endYear } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const education = user.education.id(educationId);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    education.institute = institute;
    education.degree = degree;
    education.field = field;
    education.startYear = startYear;
    education.endYear = endYear;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { educationId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const education = user.education.id(educationId);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    education.deleteOne();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
};

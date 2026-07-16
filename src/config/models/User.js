const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },

  headline: {
    type: String,
    default: "",
  },

  about: {
    type: String,
    default: "",
  },

  skills: [
    {
      type: String,
    },
  ],

  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      currentlyWorking: Boolean,
    },
  ],

  education: [
    {
      institute: String,
      degree: String,
      field: String,
      startYear: Number,
      endYear: Number,
    },
  ],

  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  profileVisits: {
    type: Number,
    default: 0,
  },


}, {
  timestamps: true,
})
module.exports = mongoose.model("User", userSchema);
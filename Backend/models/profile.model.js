const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    first_major: {
      type: String,
      required: [true, "First Major is required"],
    },
    second_major: {
      type: String,
      required: false,
      default: "",
    },
    education_status: {
      type: String,
      required: [true, "Education Status is required"],
    },
    year_of_study: {
      type: Number,
      required: [true, "Year of Study is required"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    interests: {
      type: [String],
      required: false,
      default: [],
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    personality: {
      type: String,
      require: [true, "Personality is required"]
    }
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

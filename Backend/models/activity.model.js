const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema(
  {
    hostID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    hostName: {
      type: String,
      required: [true, "Host name is required"]
    },
    activityName: {
        type: String,
        required: [true, "Activity name is required"]
    },
    pax: {
        type: Number,
        required: [true, "Number of participant is required"]
    },
    startDate: {
        type: String,
        required: [true, "Start Date is required"]
    },
    endDate: {
        type: String,
        required: [true, "End Date is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
  },
  { timestamps: true,}
);

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;

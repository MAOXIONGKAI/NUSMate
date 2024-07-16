const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ParticipantSchema = mongoose.Schema(
  {
    participantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    hostID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    activityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Declined", "Pending"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Participant = mongoose.model("Participant", ParticipantSchema);

module.exports = Participant;

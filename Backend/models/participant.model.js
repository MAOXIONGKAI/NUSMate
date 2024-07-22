const { Timestamp, ObjectId, Db } = require("mongodb");
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
      enum: [
        "Approved",
        "Declined",
        "Pending",
        "Invite-Accepted",
        "Invite-Rejected",
        "Invited",
      ],
      default: "Pending",
      required: true,
    },
    notified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Create unique index based on the participant, host and activity's ID
// to ensure that the database does not contain multiple entries of same
// participation relationship
// Status is included to prevent existing declined/rejected requests from
// causing duplicating key errors when creating new requests
ParticipantSchema.index(
  { participantID: 1, hostID: 1, activityID: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      $or: [
        { status: "Pending" },
        { status: "Invited" },
        { status: "Approved" },
        { status: "Invite-Accepted" },
      ],
    },
  }
);

const Participant = mongoose.model("Participant", ParticipantSchema);

module.exports = Participant;

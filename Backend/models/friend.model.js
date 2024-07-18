const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Declined", "Pending"],
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

// Create unique index based on the fromUserID and toUserID
// to ensure that the database does not contain multiple entries of same
// friend relationship
// Status is included to prevent existing declined record from causing duplicating
// key errors when submitting new friend request
FriendSchema.index({ fromUserID: 1, toUserID: 1, status: 1 }, { unique: true, partialFilterExpression: {
  $or: [{ status: "Pending" }, { status: "Approved" }],
},  });

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;

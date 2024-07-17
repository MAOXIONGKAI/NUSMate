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
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// Create unique index based on the fromUserID and toUserID
// to ensure that the database does not contain multiple entries of same
// friend relationship
FriendSchema.index({ fromUserID: 1, toUserID: 1 }, { unique: true });

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
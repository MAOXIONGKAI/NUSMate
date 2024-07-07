import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function WithdrawFriendRequest(profileID, targetID) {
  try {
    const response = await axios.delete(`${backendURL}/api/friends/withdraw_request`,
      {
        fromUserID: profileID,
        toUserID: targetID,
        status: "Pending",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.status !== 404;
  } catch (error) {
    console.log(
      "Error when withdrawing sent friend request: " +
        (JSON.stringify(error.response.data) || error.message)
    );
  }
}

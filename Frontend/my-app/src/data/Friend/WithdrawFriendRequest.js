import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function WithdrawFriendRequest(requestID) {
  try {
    const response = await axios.delete(`${backendURL}/api/friends/withdraw_request/${requestID}`,
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

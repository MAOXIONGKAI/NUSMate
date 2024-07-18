import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function ApproveFriendRequest(requestID) {
  try {
    const response = await axios.put(
      `${backendURL}/api/friends/approve_request/${requestID}`,
      { status: "Approved", notified: false },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when approve friend request: " +
        (JSON.stringify(error.response?.data) || error.message)
    );
  }
}

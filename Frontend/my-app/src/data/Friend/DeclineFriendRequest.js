import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function DeclineFriendRequest(requestID) {
  try {
    const response = await axios.put(
      `${backendURL}/api/friends/decline_request/${requestID}`,
      { status: "Declined" },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when declining friend request: " +
        JSON.stringify(error.response?.data)
    );
  }
}

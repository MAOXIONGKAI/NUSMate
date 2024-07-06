import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetPendingFriendRequest(profileID) {
  try {
    const response = await axios.get(
      `${backendURL}/api/friends/pending_request/${profileID}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching pending friend request from database: " + 
      error.response.data
    );
  }
}

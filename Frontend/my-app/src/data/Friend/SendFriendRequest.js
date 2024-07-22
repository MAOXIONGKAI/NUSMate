import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function SendFriendRequest(profileID, friendID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/friends/`,
      {
        fromUserID: profileID,
        toUserID: friendID,
        status: "Pending",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when sending friend request: " +
        JSON.stringify(error.response.data)
    );
  }
}

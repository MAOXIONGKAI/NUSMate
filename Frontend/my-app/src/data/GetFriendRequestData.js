import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetFriendRequestData(profileID, targetID) {
  try {
    const response = await axios.post(
        `${backendURL}/api/friends/check_if_requested`,
        {
          fromUserID: profileID,
          toUserID: targetID,
          status: "Pending",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
  } catch (error) {
    console.log(
      "Error when fetching friend request detail: " +
        (JSON.stringify(error.response?.data) || error.message)
    );
  }
}

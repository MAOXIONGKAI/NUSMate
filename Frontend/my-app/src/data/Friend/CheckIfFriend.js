import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CheckIfFriend(profileID, targetID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/friends/check_if_friend`,
      {
        fromUserID: profileID,
        toUserID: targetID,
        status: "Approved",
      }
    );
    return response.status !== 404;
  } catch (error) {
    console.log(
      "Error when determining friendship between two users: " +
        (JSON.stringify(error.response?.data) || error.message)
    );
  }
}

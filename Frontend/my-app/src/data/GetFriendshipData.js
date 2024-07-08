import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetFriendshipData(profileID, targetID) {
  try {
    const response = await axios.post(
        `${backendURL}/api/friends/check_if_friend`,
        {
          fromUserID: profileID,
          toUserID: targetID,
          status: "Approved",
        }
      );
      return response.data;
  } catch (error) {
    console.log(
      "Error when getting friendship detail: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

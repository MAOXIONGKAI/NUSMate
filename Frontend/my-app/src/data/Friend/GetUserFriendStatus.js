import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetUserFriendStatus(userID) {
  try {
    const response = await axios.get(`${backendURL}/api/friends/${userID}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error when getting user friend status: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

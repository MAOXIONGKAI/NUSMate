import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetFriends(userID) {
  try {
    const response = await axios.get(`${backendURL}/api/friends/all_friends/${userID}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching user's friends data from database: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function RemoveFriend(friendshipID) {
  try {
    const response = await axios.delete(
      `${backendURL}/api/friends/remove_friend/${friendshipID}`
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when removing friend: " + JSON.stringify(error.response?.data) ||
        error.message
    );
  }
}

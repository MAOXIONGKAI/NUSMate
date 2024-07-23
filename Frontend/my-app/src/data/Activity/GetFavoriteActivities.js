import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetFavoriteActivities(userID) {
  try {
    const response = await axios.get(
      `${backendURL}/api/favorite_activities/${userID}`
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching user's favorite activities through axios: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

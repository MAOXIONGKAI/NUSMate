import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetAllJoinedActivities(userID) {
  try {
    const response = await axios.post(`${backendURL}/api/participants/joined_activities/${userID}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error when getting joined activities for the user: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

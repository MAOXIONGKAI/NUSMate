import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetAssociatedParticipations(userID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/associated_participations/${userID}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when getting associated activity data: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

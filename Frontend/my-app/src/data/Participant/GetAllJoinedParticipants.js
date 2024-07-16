import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetAllJoinedParticipants(activityID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/joined_participants/${activityID}`
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching joined participants data: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

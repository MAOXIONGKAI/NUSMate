import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetParticipantRequest(participantID, activityID) {
  try {
    const requestBody = {
      participantID: participantID,
      activityID: activityID,
      status: "Pending",
    };
    const response = await axios.post(`${backendURL}/api/participants/participant`, requestBody);
    return response?.data;
  } catch (error) {
    console.log(
      "Error when getting participant data: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

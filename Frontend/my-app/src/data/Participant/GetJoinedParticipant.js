import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetJoinedParticipant(participantID, activityID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/participant/`,
      {
        participantID: participantID,
        activityID: activityID,
        status: "Approved",
      }
    );
    return response?.data;
  } catch (error) {
    console.log(
      "Error when finding joined participant: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

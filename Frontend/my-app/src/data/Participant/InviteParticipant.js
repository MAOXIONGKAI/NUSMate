import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function InviteParticipant(participantID, hostID, activityID) {
  try {
    const requestBody = {
      participantID: participantID,
      hostID: hostID,
      activityID: activityID,
      status: "Invited",
    };
    const response = await axios.post(
      `${backendURL}/api/participants/`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when inviting participant: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

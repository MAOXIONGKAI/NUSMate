import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CreateParticipant(
  participantID,
  hostID,
  activityID
) {
  const newParticipant = {
    participantID: participantID,
    hostID: hostID,
    activityID: activityID,
    status: "Pending",
  };
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/`,
      newParticipant,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when creating new participants for activity: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

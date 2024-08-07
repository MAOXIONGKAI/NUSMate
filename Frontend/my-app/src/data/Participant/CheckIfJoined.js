import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CheckIfJoined(participantID, activityID) {
  try {
    const requestBody = {
      $or: [
        {
          participantID: participantID,
          activityID: activityID,
          status: "Approved",
        },
        {
          participantID: participantID,
          activityID: activityID,
          status: "Invite-Accepted",
        },
      ],
    };
    const response = await axios.post(
      `${backendURL}/api/participants/check_if_joined/`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.status !== 404;
  } catch (error) {
    console.log(
      "Error when checking if user has joined the activity: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

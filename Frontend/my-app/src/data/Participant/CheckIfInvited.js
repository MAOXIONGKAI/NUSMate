import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CheckIfInvited(
  participantID,
  hostID,
  activityID
) {
  try {
    const requestBody = {
      participantID: participantID,
      hostID: hostID,
      activityID: activityID,
      status: "Invited"
    };
    const response = await axios.post(
      `${backendURL}/api/participants/check_if_invited/`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.status !== 404;
  } catch (error) {
    console.log(
      "Error when checking the user has been invited to the activity: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

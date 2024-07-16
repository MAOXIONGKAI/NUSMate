import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function RemoveParticipant(requestID) {
  try {
    const response = await axios.delete(
      `${backendURL}/api/participants/${requestID}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when removing participant from the activity: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetAllSentRequests(userID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/sent_requests/${userID}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when getting all sent activity request for user: " +
        JSON.stringify(error.response.data) || error.message
    );
  }
}

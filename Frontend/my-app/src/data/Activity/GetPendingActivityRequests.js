import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetPendingActivityRequests(hostID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/participants/pending_requests/${hostID}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when getting pending activity request" +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

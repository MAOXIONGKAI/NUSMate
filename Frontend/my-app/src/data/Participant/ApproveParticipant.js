import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function ApproveParticipant(id) {
  try {
    const response = await axios.put(
      `${backendURL}/api/participants/approve_request/${id}`,
      { status: "Approved", notified: false },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when approving the activity request: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

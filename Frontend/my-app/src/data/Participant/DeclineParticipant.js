import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function DeclineParticipant(id) {
  try {
    const response = await axios.put(
      `${backendURL}/api/participants/decline_request/${id}`,
      { status: "Declined", notified: false },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when declining activity request: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

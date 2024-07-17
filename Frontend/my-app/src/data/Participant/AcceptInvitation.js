import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function AcceptInvitation(requestID) {
  try {
    const requestBody = { status: "Invite-Accepted" };
    const response = await axios.put(
      `${backendURL}/api/participants/accept_invitation/${requestID}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when accepting activity invitation: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

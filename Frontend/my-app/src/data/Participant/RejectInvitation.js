import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function RejectInvitation(requestID) {
  try {
    const requestBody = { status: "Invite-Rejected" };
    const response = await axios.put(
      `${backendURL}/api/participants/reject_invitation/${requestID}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when rejecting activity invitation: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}
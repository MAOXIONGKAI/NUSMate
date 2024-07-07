import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CheckIfPendingRequest(profileID, targetID) {
  try {
    const response = await axios.post(
      `${backendURL}/api/friends/check_if_requested`,
      {
        fromUserID: profileID,
        toUserID: targetID,
        status: "Pending",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.status !== 404;
  } catch (error) {
    console.log(
      "Error when check if there's pending friend request in database: " +
        (JSON.stringify(error?.response.data) || error.message)
    );
  }
}

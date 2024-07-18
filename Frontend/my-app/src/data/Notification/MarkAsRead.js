import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function MarkAsRead(notification) {
  try {
    let response;
    const requestBody = { notified: true };

    response = await axios.put(
      `${backendURL}/api/${
        notification.activityID ? "participants" : "friends"
      }/mark_as_read/${notification._id}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.log(
      "Error when marking notification as read: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

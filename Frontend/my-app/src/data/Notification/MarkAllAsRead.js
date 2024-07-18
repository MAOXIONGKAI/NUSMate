import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function MarkAllAsRead(notifications) {
  try {
    const requestBody = { notified: true,};
    const requestPromises = notifications.map((notification) => {
      return axios.put(
        `${backendURL}/api/${
          notification.activityID ? "participants" : "friends"
        }/mark_as_read/${notification._id}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );
    });
    const response = await Promise.all(requestPromises);
    return response;
  } catch (error) {
    console.log(
      "Error when marking all notifications as read: " +
        JSON.stringify(error.response?.data) || error.response
    );
  }
}

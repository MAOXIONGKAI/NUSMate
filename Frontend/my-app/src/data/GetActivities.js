import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetActivities() {
  try {
    const activities = await axios.get(`${backendURL}/api/activities`, {
      headers: { "Content-Type": "application/json" },
    });
    return activities.data;
  } catch (error) {
    console.log(
      "Error when fetching activities from database: " +
        JSON.stringify(error.response.data)
    );
  }
}

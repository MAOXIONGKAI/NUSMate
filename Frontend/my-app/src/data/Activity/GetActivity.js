import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetActivity(ID) {
  try {
    const response = await axios.get(`${backendURL}/api/activities/${ID}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching activity data from database: " +
        JSON.stringify(error.response.data) || error.message
    );
  }
}

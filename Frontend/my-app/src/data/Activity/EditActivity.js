import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function EditActivity(activityID, formData) {
  try {
    const response = await axios.post(
      `${backendURL}/api/activities/${activityID}`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error when editing activity data: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}

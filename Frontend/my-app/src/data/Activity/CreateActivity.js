import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function CreateActivity(formJson) {
  try {
    const response = await axios.post(
      `${backendURL}/api/activities`,
      formJson,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error when creating activity: " + JSON.stringify(error.response.data));
  }
}

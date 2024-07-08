import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetUserProfile(ID) {
  try {
    const response = await axios.get(`${backendURL}/api/friends/${ID}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error when fetching user profile: " +
        (JSON.stringify(error.response.data) || error.message)
    );
  }
}

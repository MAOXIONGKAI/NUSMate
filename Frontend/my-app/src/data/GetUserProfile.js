import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function GetUserProfile(profile, setProfile) {
    try {
      const response = await axios.get(
        `${backendURL}/api/profiles/email/${profile.email}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.log(
        "Error when refreshing user profile info: " + error.response.data
      );
    }
  };
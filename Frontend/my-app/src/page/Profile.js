import React from "react";
import axios from "axios";
import ProfilePage from "../component/ProfilePage";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function Profile(prop) {
  const updateProfile = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/profiles/email/${prop.profile.email}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      prop.setProfile(response.data);
    } catch (error) {
      console.log(
        "Error when refreshing user profile info: " + error.response.data
      );
    }
  };

  React.useEffect(() => {
    updateProfile();
  }, []);

  return (
    <>
      <ProfilePage profile={prop.profile} setProfile={prop.setProfile} />
    </>
  );
}

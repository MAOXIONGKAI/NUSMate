import React from "react";
import ProfilePage from "../component/ProfilePage";
import GetUserProfile from "../data/GetUserProfile";

export default function Profile(prop) {
  
  React.useEffect(() => {
    GetUserProfile(prop.profile, prop.setProfile);
  }, []);

  return (
    <>
      <ProfilePage profile={prop.profile} setProfile={prop.setProfile} />
    </>
  );
}

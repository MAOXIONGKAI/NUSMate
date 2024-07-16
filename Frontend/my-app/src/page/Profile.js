import React from "react";
import ProfilePage from "../component/ProfilePage";
import UpdateLocalUserProfile from "../data/UpdateLocalUserProfile";

export default function Profile(prop) {
  
  React.useEffect(() => {
    UpdateLocalUserProfile(prop.profile, prop.setProfile);
  }, []);

  return (
    <>
      <ProfilePage profile={prop.profile} setProfile={prop.setProfile} />
    </>
  );
}

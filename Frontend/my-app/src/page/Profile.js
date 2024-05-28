import React from "react";
import ProfilePage from "../component/ProfilePage";

export default function Profile(prop) {
  return (
    <>
      <ProfilePage profile={prop.profile}/>
    </>
  );
}
import React from "react";

export default function Discover(prop) {
  return (
    <div className="tobeCompleted">
      <h1>Welcome!</h1>
      {prop.profile && <h1>{prop.profile.username}</h1>}
      <h2>
        The discover page for logged in users is meant <br />
        to be finished in the future milestones
      </h2>
      <p>Please stay tunned to our new wonderful features!</p>
    </div>
  );
}

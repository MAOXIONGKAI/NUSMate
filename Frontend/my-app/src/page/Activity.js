import React from "react";

export default function Activity(prop) {
  return (
    <div className="tobeCompleted">
      <h1>Welcome!</h1>
      {prop.profile && <h1>{prop.profile.username}</h1>}
      <h2>
        The activity page for logged in users is meant <br />
        to be finished in the future milestones
      </h2>
      <p>Please stay tunned to our new wonderful features!</p>
    </div>
  );
}

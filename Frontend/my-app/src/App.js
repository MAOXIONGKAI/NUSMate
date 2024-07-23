import React from "react";
import "./App.css";
import Header from "./page/Header";
import Main from "./page/Main";
import Discover from "./page/Discover";
import Friend from "./page/Friend";
import Profile from "./page/Profile";
import Login from "./page/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./page/ForgotPassword";
import Activity from "./page/Activity";
import SignUp from "./page/SignUp";
import Chat from "./page/Chat";

function App() {
  //Reading data from online source (database, server, API, etc.)
  const savedProfile = JSON.parse(window.localStorage.getItem("profileData"));
  const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedInStatus"));

  //Keep track of user info using states
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);
  const [profile, setProfile] = React.useState(
    savedProfile
      ? savedProfile
      : {
          username: "",
          email: "",
          password: "",
          first_major: "",
          second_major: "",
          education_status: "",
          year_of_study: 0,
          nationality: "",
          gender: "",
          birthday: "",
          location: "",
          interests: [],
          description: "",
          personality: "",
        }
  );

  //React Effect
  React.useEffect(() => {
    window.localStorage.setItem("loggedInStatus", JSON.stringify(loggedIn));
  }, [loggedIn]);

  React.useEffect(() => {
    window.localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  return (
    <Router>
      <div className="App">
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          profile={profile}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                profile={profile}
                setProfile={setProfile}
              />
            }
          />
          <Route
            path="/discover"
            element={<Discover profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/profile"
            element={<Profile profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/friend"
            element={<Friend profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/activity"
            element={<Activity profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/chat"
            element={<Chat profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/login"
            element={
              <Login
                profile={profile}
                setProfile={setProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp
                profile={profile}
                setProfile={setProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

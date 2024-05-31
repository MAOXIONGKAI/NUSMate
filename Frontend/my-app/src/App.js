import React from "react";
import "./App.css";
import Header from "./page/Header";
import Main from "./page/Main";
import Discover from "./page/Discover";
import Profile from "./page/Profile";
import Login from "./page/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./page/ForgotPassword";
import Activity from "./page/Activity";
import SignUp from "./page/SignUp";

function App() {
  //Reading data from online source(database, server, API etc)
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
        }
  );

  //React Effect
  React.useEffect(() => {
    window.localStorage.setItem("loggedInStatus", loggedIn)
  }, [loggedIn])

  React.useEffect(() => {
    window.localStorage.setItem("profileData", JSON.stringify(profile))
  }, [profile])

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/discover"
            element={<Discover profile={profile} setProfile={setProfile} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/profile"
            element={<Profile profile={profile} setProfile={setProfile} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/activity"
            element={<Activity profile={profile} setProfile={setProfile} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                profile={profile}
                setProfile={setProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <SignUp
                profile={profile}
                setProfile={setProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

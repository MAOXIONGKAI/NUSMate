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
  const profileGet = JSON.parse(window.localStorage.getItem("signUpFormData"));

  //Keep track of user info using states
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [profile, setProfile] = React.useState(
    profileGet
      ? profileGet
      : {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          first_major: "",
          second_major: "",
          education_status: "",
          year_of_study: 0,
          nationality: "",
          gender: "",
          birthday: null,
          location: "",
          interests: [],
          description: "",
        }
  );

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        <Routes>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/profile"
            element={<Profile profile={profile} setProfile={setProfile} />}
          ></Route>
        </Routes>
        <Routes>
          <Route path="/activity" element={<Activity />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/sign-up"
            element={<SignUp profile={profile} setProfile={setProfile} />}
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

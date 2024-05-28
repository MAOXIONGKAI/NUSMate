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
  const profileGet = JSON.parse(window.localStorage.getItem("signUpFormData"));
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [profile, setProfile] = React.useState(profileGet);

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
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
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

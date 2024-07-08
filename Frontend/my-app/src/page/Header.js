import React from "react";
import axios from "axios";
import MainLogo from "../image/Main-Logo.png";
import { Button } from "@mui/material";
import NotificationMenu from "../component/NotificationMenu";
import ChatMenu from "../component/ChatMenu";
import AccountMenu from "../component/AccountMenu";
import { Link } from "react-router-dom";
import StyledButton from "../component/StyledButton";

import GetUserFriendStatus from "../data/GetUserFriendStatus";
const backendURL = process.env.REACT_APP_BACKEND_URL;

function LoggedInHeader(prop) {
  const [messages, setMessages] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const { profile } = prop;

  React.useEffect(() => {
    const getData = async () => {
      setMessages(await GetUserFriendStatus(profile._id));
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getRequestInfo = async () => {
      const requestPromises = messages.map((message) => {
        const requestUserID = message.status === "Approve" || message.status === "Declined"
        ? message.toUserID
        : message.fromUserID
        return axios.get(`${backendURL}/api/profiles/${requestUserID}`, {
          headers: { "Content-Type": "application/json" },
        });
      });
      const profiles = await Promise.all(requestPromises);
      const profileData = profiles.map((profile) => profile.data);
      setNotifications(
        messages.map((message, index) => ({
          ...message,
          ...profileData[index],
          requestTime: message.updatedAt,
        }))
      );
    };
    getRequestInfo();
  }, [messages]);

  return (
    <header className="header">
      <a href="/">
        <img
          className="header-logo"
          src={MainLogo}
          alt="Main Logo for NUSMate Main Page"
        />
      </a>
      <div className="header-navigation">
        <nav className="header-nav-bar">
          <ul className="header-nav-items">
            <li>
              <Button component={Link} to="/discover" variant="text">
                Discover
              </Button>
            </li>
            <li>
              <Button component={Link} to="/activity" variant="text">
                Activity
              </Button>
            </li>
          </ul>
        </nav>
        <nav className="header-userMenu">
          <ul className="header-menuList">
            <li>
              <NotificationMenu
                profile={profile}
                messages={messages}
                setMessages={setMessages}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </li>
            <li>
              <ChatMenu />
            </li>
            <li>
              <AccountMenu setLoggedIn={prop.setLoggedIn} profile={profile} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function LandingHeader() {
  return (
    <header className="header">
      <a component={Link} to="/" href="/">
        <img
          className="header-logo"
          src={MainLogo}
          alt="Main Logo for NUSMate Main Page"
        />
      </a>
      <StyledButton
        text="Login / Register"
        component={Link}
        to="/login"
        variant="contained"
        style={{
          color: "white",
          marginLeft: "auto",
          marginRight: "100px",
          fontSize: "16px",
        }}
      />
    </header>
  );
}

export default function Header(prop) {
  return (
    <>
      {prop.loggedIn ? (
        <LoggedInHeader setLoggedIn={prop.setLoggedIn} profile={prop.profile} />
      ) : (
        <LandingHeader setLoggedIn={prop.setLoggedIn} />
      )}
    </>
  );
}

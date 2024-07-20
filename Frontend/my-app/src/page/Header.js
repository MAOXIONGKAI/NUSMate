import React from "react";
import axios from "axios";
import MainLogo from "../image/Main-Logo.png";
import { Button } from "@mui/material";
import NotificationMenu from "../component/NotificationMenu";
import ChatMenu from "../component/ChatMenu";
import AccountMenu from "../component/AccountMenu";
import { Link } from "react-router-dom";
import StyledButton from "../component/StyledButton";
import GetNotifications from "../data/Notification/GetNotifications";
const backendURL = process.env.REACT_APP_BACKEND_URL;

function LoggedInHeader(prop) {
  const [messages, setMessages] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const { profile } = prop;

  React.useEffect(() => {
    const getData = async () => {
      setMessages(await GetNotifications(profile._id));
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getRequestInfo = async () => {
      const requestPromises = messages.map(async (message) => {
        const profileResponse = await axios
          .get(
            `${backendURL}/api/profiles/${
              message.activityID
                ? message.participantID === profile._id
                  ? message.hostID
                  : message.participantID
                : message.fromUserID === profile._id
                ? message.toUserID
                : message.fromUserID
            }`,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .catch((error) => {
            console.log(
              "Error when fetching profile data contained in the notification through axios: " +
                JSON.stringify(error.response?.data) || error.message
            );
          });
        const activityResponse = message.activityID
          ? await axios
              .get(`${backendURL}/api/activities/${message.activityID}`)
              .catch((error) => {
                console.log(
                  "Error when fetching activity info contained in the notification through axios: " +
                    JSON.stringify(error.response?.data) || error.message
                );
              })
          : null;

        const profileData = await profileResponse.data;
        const activityData = await activityResponse?.data;
        return {
          ...profileData,
          ...(activityData ? activityData : {}),
          ...message,
          requestTime: message.updatedAt,
        };
      });

      const result = await Promise.all(requestPromises);
      setNotifications(result);
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
            <li>
              <Button component={Link} to="/chat" variant="text">
                Chat
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

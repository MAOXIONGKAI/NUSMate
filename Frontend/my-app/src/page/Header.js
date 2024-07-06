import React from "react";
import MainLogo from "../image/Main-Logo.png";
import { Button } from "@mui/material";
import NotificationMenu from "../component/NotificationMenu";
import ChatMenu from "../component/ChatMenu";
import AccountMenu from "../component/AccountMenu";
import { Link } from "react-router-dom";
import StyledButton from "../component/StyledButton";

function LoggedInHeader(prop) {
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
              <NotificationMenu profile={prop.profile} />
            </li>
            <li>
              <ChatMenu />
            </li>
            <li>
              <AccountMenu
                setLoggedIn={prop.setLoggedIn}
                profile={prop.profile}
              />
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
      <a component={ Link } to="/" href="/">
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
        <LoggedInHeader
          setLoggedIn={prop.setLoggedIn}
          profile={prop.profile}
        />
      ) : (
        <LandingHeader
          setLoggedIn={prop.setLoggedIn}
        />
      )}
    </>
  );
}

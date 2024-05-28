import React from "react";
import MainLogo from "../image/Main-Logo.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import StyledButton from "../component/StyledButton";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header-logo"
        src={MainLogo}
        alt="Main Logo for NUSMate Main Page"
      />
      <nav className="header-nav-bar">
        <ul className="header-nav-items">
          <li>
            <Button component={Link} to="/" variant="text">
              Home
            </Button>
          </li>
          <li>
            <Button component={Link} to="/profile" variant="text">
              Profile
            </Button>
          </li>
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

      <StyledButton
        text="Login / Register"
        component={Link}
        to="/login"
        variant="contained"
        style={{ color: "white", marginRight: "100px", fontSize: "16px" }}
      />
    </header>
  );
}

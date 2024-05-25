import React from "react";
import MainLogo from "../image/Main-Logo.png";
import { Container, Button, List } from "@mui/material";
import { Link } from "react-router-dom";

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
            <Button component={Link} to="/search" variant="text">
              Search
            </Button>
          </li>
        </ul>
      </nav>
      <Button
        className="header-login"
        component={Link}
        to="/login"
        variant="contained"
        style={{ color: "white", backgroundColor: "black", marginRight:"100px"}}
      >
        Login/Register
      </Button>
    </header>
  );
}

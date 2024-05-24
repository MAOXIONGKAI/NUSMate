import React from "react";
import MainLogo from "../image/Main-Logo.png";


export default function Header() {
  return (
      <header className="header">
        <img
          className="header-logo"
          src={MainLogo}
          alt="Main Logo for NUSMate Main Page"
        />
        <h1 className="header-title">Discover your best friend in NUS!</h1>
        <nav className="header-nav-bar">
          <ul className="header-nav-items">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
            <li>
              <a href="login">Login/Register</a>
            </li>
          </ul>
        </nav>
      </header>
  );
}

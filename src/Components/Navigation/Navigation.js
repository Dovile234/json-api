import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <Link to="/">
          <p className="logo">JSONApi</p>
        </Link>
        <ul className="main-navigation">
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/json-api/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/json-api/albums">Albums</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

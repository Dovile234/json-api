import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="container">
      <ul className="main-navigation">
        <li>
          <NavLink to="/json-api">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/json-api/posts">Posts</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.scss";
import searchIcon from "../../Images/search.png";

const Navigation = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <Link to="/">
          <p className="logo">JSONApi</p>
        </Link>
        <form action={`/json-api/search/${search}`}>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <img className="search-icon" src={searchIcon} />
          </button>
        </form>
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

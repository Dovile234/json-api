import React from "react";
import "./Landing-page.scss";
import UsersOnline from "./Components/Users-online/Users-online";
import LatestPosts from "./Components/Latest-posts/Latest-posts";
import TopPhotos from "./Components/Top-photos/Top-photos";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="landing-page-wrapper">
        <div className="left-section">
          <span>ONLINE</span>
          <UsersOnline />
        </div>
        <div className="middle-section">
          <LatestPosts />
        </div>
        <div className="right-section">
          <div className="highlights-title-wrapper">
            <h2>Todays Highlights </h2>
            <Link to="/json-api/albums">More</Link>
          </div>
          <TopPhotos />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

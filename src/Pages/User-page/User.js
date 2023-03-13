import React from "react";
import { useParams } from "react-router-dom";
import MiddleSection from "./Components/Middle-section/Middle-section";
import ProfileInfo from "./Components/Profile-info/Profile-info";
import Albums from "./Components/Right-section/Albums";
import "./User.scss";

const User = () => {
  let { id } = useParams();

  return (
    <div>
      <div className="user-bg-wrapper"></div>
      <div className="container">
        <div className="user-wrapper">
          <div className="user-info">
            <ProfileInfo onId={id} />
          </div>
          <div className="middle-section">
            <MiddleSection onId={id} />
          </div>
          <div className="right-section">
            <Albums onId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

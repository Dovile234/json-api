import React, { useEffect, useState } from "react";
import "./Profile-info.scss";
import tel from "../../../../Images/tel.png";
import mail from "../../../../Images/mail.png";
import link from "../../../../Images/link.png";
import { Link } from "react-router-dom";
import Albums from "../Right-section/Albums";

const ProfileInfo = ({ onId }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/${onId}`)
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }, [onId]);

  return (
    <div>
      <div>
        <div className="followers-wrapper">
          <img
            className="profile-img"
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="profile"
          />
          <div className="follower-info">
            <p>
              Following <span>148</span>
            </p>
            <p>
              Followers <span>312</span>
            </p>
          </div>
          <div className="other-info">
            {user.email && (
              <Link>
                <img className="icon" src={mail} alt="email" />
                {user.email}
              </Link>
            )}
            {user.phone && (
              <Link>
                <img className="icon" src={tel} alt="home" />
                {user.phone}
              </Link>
            )}
            {user.website && (
              <Link>
                <img className="icon" src={link} alt="link" />
                {user.website}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="hidden">
        <Albums onId={onId} />
      </div>
    </div>
  );
};

export default ProfileInfo;

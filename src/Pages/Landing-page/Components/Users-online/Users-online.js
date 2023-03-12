import online from "../../../../Images/online.png";
import React, { useState, useEffect } from "react";
import "./Users-online.scss";
import { Link } from "react-router-dom";

const UsersOnline = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((usersData) => {
        setUsers(usersData);
      });
  }, []);

  return (
    <div className="users-wrapper">
      {users && users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <Link to={`/json-api/user/${user.id}`} key={index}>
              <div className="user-item">
                <img
                  className="user-picture"
                  src="https://xsgames.co/randomusers/avatar.php?g=female"
                  alt="profile"
                />
                <div className="user-info">
                  <p>{user.name}</p>
                  <span>{user.address.city}</span>
                </div>
                <img className="online" src={online} alt="online" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
};

export default UsersOnline;

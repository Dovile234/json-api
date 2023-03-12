import React from "react";
import "./Page-not-found.scss";
import error from "../../Images/404Error.svg";

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="bg-image"></div>
      <div className="error-image-wrapper">
        <img className="error-image" src={error} alt="page not found" />
      </div>
    </div>
  );
};

export default PageNotFound;

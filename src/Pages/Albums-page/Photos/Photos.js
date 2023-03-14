import React from "react";
import "./Photos.scss";

const Photos = ({ onData }) => {
  return (
    <div className="photos-wrapper">
      {onData.map((photo, index) => (
        <img key={index} src={photo.thumbnailUrl} alt="random" />
      ))}
    </div>
  );
};

export default Photos;

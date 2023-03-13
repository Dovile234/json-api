import React, { useState, useEffect } from "react";
import "./Top-photos.scss";

const TopPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=8")
      .then((res) => res.json())
      .then((photosData) => {
        setPhotos(photosData);
      });
  }, []);
  return (
    <div className="top-photos-wrapper">
      {photos && photos.length > 0 ? (
        <div>
          {photos.map((photo, index) => (
            <div className="photo-container" key={index}>
              <div className="photo-wrapper">
                <img src={`https://picsum.photos/350/200`} alt="random" />
              </div>
              <h4>{photo.title}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p>No highlights today</p>
      )}
    </div>
  );
};

export default TopPhotos;

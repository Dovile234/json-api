import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Album.scss";
import icon from "../../Images/xicon.png";

const Album = () => {
  let { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [model, setModel] = useState(false);
  const [tempImg, setTempImg] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/albums/${id}/photos`)
      .then((res) => res.json())
      .then((photos) => {
        setPhotos(photos);
      });
  }, [id]);

  const getImg = (imgSrc) => {
    setTempImg(imgSrc);
    setModel(true);
  };

  return (
    <div className="gallery-container">
      <h1>Image gallery</h1>
      {photos && photos.length > 0 ? (
        <>
          <div className={model ? "model open" : "model"}>
            <img src={tempImg} alt="temporary" />
            <img
              className="icon"
              src={icon}
              onClick={() => setModel(false)}
              alt="x"
            />
          </div>
          <div className="gallery">
            {photos.map((photo, index) => (
              <div
                className="pics"
                key={index}
                onClick={() => getImg(photo.url)}
              >
                <img src={photo.url} alt="random" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No photos</p>
      )}
    </div>
  );
};

export default Album;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Albums.scss";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/albums?_limit=15")
      .then((res) => res.json())
      .then((albumsData) => {
        setAlbums(albumsData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/albums/1/photos`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  return (
    <div className="albums-container">
      <div className="albums-wrapper">
        {albums && albums.length > 0 ? (
          <div className="album-wrapper">
            {albums.map((album, index) => (
              <Link
                to={`/json-api/album/${album.id}`}
                className="album-item"
                key={index}
              >
                <h3>{album.title}</h3>
                <div className="photos-wrapper">
                  {photos.map((photo, index) => (
                    <img key={index} src={photo.thumbnailUrl} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <span>No albums</span>
        )}
        ;
      </div>
    </div>
  );
};

export default Albums;

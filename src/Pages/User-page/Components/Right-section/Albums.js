import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Albums.scss";

const Albums = ({ onId }) => {
  const [albums, setAlbums] = useState("");
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/user/${onId}/albums`)
      .then((res) => res.json())
      .then((albumsData) => {
        setAlbums(albumsData);
      });
  }, [onId]);

  useEffect(() => {
    fetch(`http://localhost:3000/albums/1/photos`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  return (
    <div className="albums-section">
      <h2>Albums</h2>
      {albums && albums.length > 0 ? (
        <div className="album-wrapper">
          {albums.map((album, index) => (
            <Link
              className="album-item-link"
              to={`/json-api/album/${album.id}`}
              key={index}
            >
              <div className="album-item">
                <h3>{album.title}</h3>
                {photos && photos.length > 0 ? (
                  <div className="photos-wrapper">
                    {photos.map((photo, index) => (
                      <img key={index} src={photo.thumbnailUrl} alt="random" />
                    ))}
                  </div>
                ) : (
                  <p>No photos</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <span>No albums</span>
      )}
    </div>
  );
};

export default Albums;

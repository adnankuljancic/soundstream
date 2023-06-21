import { CardGroup } from "react-bootstrap";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import axios from "axios";
import { useEffect, useState } from "react";
import AudioCard from "../AudioCard/AudioCard";
export const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs from the database
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/songs`)
      .then((response) => {
        const songsData = response.data;
        setSongs(songsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container my-3">
      <h1 className="mt-5">Welcome to SoundStream!</h1>
      <p className="mb-5">Select a playlist and enjoy listening.</p>

      <CardGroup>
        <div className="container">
          <div className="row g-4">
            {songs.map((song) => (
              <div key={song.id} className="col-3">
                <AudioCard song={song} />
              </div>
            ))}
          </div>
        </div>
      </CardGroup>
    </div>
  );
};

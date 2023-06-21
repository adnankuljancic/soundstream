import "./LikedSongs.css";
import { useEffect, useState } from "react";
import AudioCard from "../AudioCard/AudioCard";
import axios from "axios";
import { CardGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import jwt_decode from "jwt-decode";

export const LikedSongs = () => {
  const [usersSongs, setUsersSongs] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [songFile, setSongFile] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(usersSongs.length);
    const fetchSongs = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }
      await axios
        .get(`http://localhost:3001/songs/${userId}`)
        .then((response) => {
          const usersSongs = response.data;
          setUsersSongs(usersSongs);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSongs();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleFileChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    let formData = new FormData();

    formData.append("file", songFile);
    formData.append("title", title);
    formData.append("artist", decoded.fullName);
    formData.append("genre", genre);
    formData.append("id", decoded.userId);

    await axios
      .post(`http://localhost:3001/songs`, formData)
      .then((response) => {
        const uploadedSong = response.data;
        setUsersSongs([...usersSongs, uploadedSong]);
        console.log("song uploaded");
        handleClose();
      })
      .catch((error) => {});
  };

  const removeSong = (songId) => {
    axios
      .delete(`http://localhost:3001/songs/${songId}`)
      .then((response) => {
        setUsersSongs(usersSongs.filter((obj) => obj._id !== songId));
        console.log("DELETED SUCCESSFULLY");
      })
      .catch((error) => {
        console.log("Error deleting song", error);
      });
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="mt-5">My Songs</h1>
        <Button variant="success" onClick={handleShow}>
          Upload a song
        </Button>

        {usersSongs.length == 0 && (
          <div className="mt-5 text-center">
            You haven't uploaded any songs.
          </div>
        )}
        <CardGroup>
          <div className="container mt-5">
            <div className="row g-4">
              {usersSongs.map((song) => (
                <div key={song.id} className="col-3">
                  <AudioCard key={song.id} song={song} onRemove={removeSong} />
                </div>
              ))}
            </div>
          </div>
        </CardGroup>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Song title: </Form.Label>
              <Form.Control
                type="text"
                onChange={handleTitleChange}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Song Genre: </Form.Label>
              <Form.Control
                type="text"
                onChange={handleGenreChange}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>MP3 file: </Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

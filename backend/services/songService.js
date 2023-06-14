const Song = require("../models/Song");
const firebaseService = require("./firebaseService");

async function uploadSong(song, audioFile) {
  try {
    title = song.title;
    artist = song.artist;
    genre = song.genre;
    audioUrl = await firebaseService.uploadFile(audioFile);
    if (audioUrl) {
      const newSong = await Song.create({
        title,
        artist,
        genre,
        audioUrl,
      });
    }

    return newSong;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload the Song");
  }
}

async function removeSong() {}

module.exports = {
  uploadSong,
  removeSong,
};

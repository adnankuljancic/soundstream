const Song = require("../models/Song");
const firebaseService = require("./firebaseService");

async function uploadSong(song, audioFile) {
  try {
    title = song.title;
    artist = song.artist;
    genre = song.genre;
    audioUrl = await firebaseService.uploadFile(audioFile, title);
    var newSong;
    if (audioUrl) {
      newSong = await Song.create({
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

async function removeSong(songId) {
  try {
    const songToRemove = await Song.findByIdAndDelete({ _id: songId });
    console.log(songToRemove);
    if (songToRemove) {
      await firebaseService.removeFile(songToRemove.title);
    }
  } catch (error) {
    console.error("removeSong: " + error);
    throw new Error("Failed to remove the Song");
  }
}

module.exports = {
  uploadSong,
  removeSong,
};

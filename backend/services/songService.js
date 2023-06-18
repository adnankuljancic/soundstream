const Song = require("../models/Song");
const firebaseService = require("./firebaseService");

async function uploadSong(song, audioFile, userId) {
  try {
    title = song.title;
    artist = song.artist;
    genre = song.genre;
    audioUrl = await firebaseService.uploadFile(audioFile, title, userId);
    var newSong;
    if (audioUrl) {
      newSong = await Song.create({
        title,
        artist,
        genre,
        audioUrl,
        user: userId,
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

async function getAllSongs() {
  try {
    const songs = await Song.find();
    if (songs.length === 0) {
      return null;
    }
    return songs;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch songs.");
  }
}

async function getSongsByUserId(id) {
  try {
    const userSongs = await Song.find({ user: id });
    console.log("Service: " + userSongs);
    if (userSongs.length === 0) {
      return null;
    }
    return userSongs;
  } catch (error) {
    throw new Error("Failed to fetch songs.");
  }
}

module.exports = {
  uploadSong,
  removeSong,
  getAllSongs,
  getSongsByUserId,
};

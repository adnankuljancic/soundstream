const songService = require("../services/songService");

async function uploadSong(req, res) {
  try {
    const file = req.file;
    const userId = req.body.id;
    var fileMimeType = file.mimetype;
    if (!fileMimeType.startsWith("audio")) {
      return res.status(400).json({ error: "Only audio files are allowed" });
    }
    var song = {
      title: req.body.title,
      artist: req.body.artist,
      genre: req.body.genre,
    };
    console.log(song);
    var uploadedSong = await songService.uploadSong(song, file, userId);
    res.status(200).json(uploadedSong);
  } catch (error) {
    res.status(404).json({ error: "Failed to upload the file." });
  }
}

async function removeSong(req, res) {
  try {
    const songId = req.params.songId;
    console.log(songId);
    await songService.removeSong(songId);

    res
      .status(200)
      .json({ message: "Song and associated file removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Failed to remove the song." });
  }
}

async function getAllSongs(req, res) {
  try {
    const songs = await songService.getAllSongs();
    console.log(songs);
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch the songs." });
  }
}

async function getSongsByUserId(req, res) {
  try {
    console.log(req.params.userId);
    const songs = await songService.getSongsByUserId(req.params.userId);
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch the songs." });
  }
}

module.exports = {
  uploadSong,
  removeSong,
  getAllSongs,
  getSongsByUserId,
};

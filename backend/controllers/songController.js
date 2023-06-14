const songService = require("../services/songService");

async function uploadSong(req, res) {
  try {
    var file = req.file;
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
    var uploadedSong = await songService.uploadSong(song, file);
    res.status(200).json(uploadedSong);
  } catch (error) {
    res.status(404).json({ error: "Failed to upload the file." });
  }
}

async function removeSong(req, res) {}

module.exports = {
  uploadSong,
  removeSong,
};

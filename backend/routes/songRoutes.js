const express = require("express");
const upload = require("../middleware/upload");

const songController = require("../controllers/songController");

const router = express.Router();

router.post("/", upload.single("file"), songController.uploadSong);
router.delete("/", songController.removeSong);
router.get("/", songController.getAllSongs);

module.exports = router;

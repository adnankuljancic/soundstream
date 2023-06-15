const express = require("express");
const upload = require("../middleware/upload");

const songController = require("../controllers/songController");

const router = express.Router();

router.post("/upload", upload.single("file"), songController.uploadSong);
router.delete("/remove", songController.removeSong);

module.exports = router;

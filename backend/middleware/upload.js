// middleware/upload.js

const multer = require("multer");

// Create a multer storage engine
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

// Create a multer instance and configure its options
const upload = multer({
  storage: storage,
});

module.exports = upload;

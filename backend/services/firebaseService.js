const { storage } = require("../firebase");
const { ref, uploadBytes } = require("firebase/storage");

async function uploadFile(file) {
  try {
    const storageRef = ref(storage, file.originalname);
    const metadata = {
      contentType: "audio/mpeg",
    };
    await uploadBytes(storageRef, file.buffer, metadata);
  } catch (error) {
    console.error(error);
  }
}

async function removeFile() {}

module.exports = {
  uploadFile,
  removeFile,
};

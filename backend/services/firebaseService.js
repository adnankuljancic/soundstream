const { storage } = require("../firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

async function uploadFile(file, title) {
  console.log(file);
  try {
    const storageRef = ref(storage, title);
    const metadata = {
      contentType: "audio/mpeg",
    };
    await uploadBytes(storageRef, file.buffer, metadata);
    const audioUrl = await getDownloadURL(storageRef);
    return audioUrl;
  } catch (error) {
    console.error(error);
  }
}

async function removeFile(fileName) {
  try {
    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
    console.log("removed succesfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  uploadFile,
  removeFile,
};

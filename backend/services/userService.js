const User = require("../models/User.js");
const { DateTime } = require("luxon");

async function createUser(username, email, password) {
  var createdAt = DateTime.now().toISO();
  var updatedAt = DateTime.now().toISO();
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      createdAt,
      updatedAt,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create User");
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById({ _id: id });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find the user with the id");
  }
}

module.exports = {
  createUser,
  getUserById,
};

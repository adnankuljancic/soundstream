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

module.exports = {
  createUser,
};

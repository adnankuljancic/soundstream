const User = require("../models/User.js");
const { DateTime } = require("luxon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(username, email, password) {
  var createdAt = DateTime.now().toISO();
  var updatedAt = DateTime.now().toISO();
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      passwordHash,
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

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!user || !isPasswordValid) {
      throw new Error("Invalid password or email");
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
}

module.exports = {
  createUser,
  getUserById,
  login,
};

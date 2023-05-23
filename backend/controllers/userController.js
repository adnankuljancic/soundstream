const userService=require('../services/userService.js');


async function createUser(req, res) {
    try {
      const { username, email, password } = req.body;
  
      const createdUser = await userService.createUser(username, email, password);
  
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create User' });
    }
  }



  module.exports = {
    createUser,
  };
const User = require('../models/User.js');

async function createUser(username,email,password){
    try{
        const newUser=await User.create({username,email,password});
        return newUser;
    }catch(error){
        console.log(error);
        throw new Error('Failed to create User');
    }
}

module.exports = {
    createUser,
  };
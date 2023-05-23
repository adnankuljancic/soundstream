require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');


const app=express();

//Database connection
const connectionString = process.env.DB;
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.error('Error connecting to MongoDB: ',error);
})
module.exports=app;
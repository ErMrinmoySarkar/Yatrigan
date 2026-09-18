require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req,res)=>{
    res.send("Hi, I am a Root");
});

module.exports = app;
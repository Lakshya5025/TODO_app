const express = require('express');
const mongoose = require("mongoose");
const { userModel, todoModel } = require('./db');
require('dotenv').config({ path: ".env" });
mongoose.connect(process.env.MONGO_URL);

// const newUser = new userModel({
//     email: "lakshyagupta916640@gmail.com",
//     name: "lakshya",
//     password: "1234"
// })

// newUser.save();



express.listen(process.env.PORT, (err) => {
    console.log(`server is listening to http://localhost:${process.env.PORT}`)
})
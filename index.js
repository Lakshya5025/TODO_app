const express = require('express');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userModel, todoModel } = require('./db');
const e = require('express');
const app = express();
require('dotenv').config({ path: ".env" });
mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
async function signup(req, res) {
    let { username, password, email } = req.body;
    email = email.toLowerCase();
    if (!username || !password || !email) {
        return res.status(400).json({
            message: "username, password and email are required"
        })
    }
    const newUser = new userModel({ username, password, email });
    try {
        await newUser.save();
        res.status(201).json({
            message: "User added successfully"
        })
    } catch (er) {
        res.json({
            message: err.message
        });
    }
}
async function signin(req, res) {
    let { username, password } = req.body;
    let data = await userModel.findOne({
        username, password
    })
    if (!data) {
        return res.status(400).json({
            message: "User not found"
        })
    }
    let token = jwt.sign({
        userId: data._id
    }, process.env.JWT_SECRET)
    res.status(200).json({
        message: token
    })
}
function auth(req, res, next) {
    const token = req.headers.token;
    try {
        let data = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = data.userId;
        console.log(data.userId);
        next();
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}
async function addtodo(req, res) {
    let { task, userId } = req.body;
    if (!task) {
        return res.json({
            message: "task name is required"
        })
    }
    let isDone = false;
    let newTodo = new todoModel({ task, userId, isDone });
    try {
        await newTodo.save();
        res.status(201).json({
            message: "task added successfully"
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}
async function gettodos(req, res) {
    const { userId } = req.body;
    try {
        const todos = await todoModel.find({ userId });
        console.log(todos);
        if (todos.length == 0) return res.json({ message: "No todo tasks" });
        else res.json({ message: todos })
    } catch (err) {
        res.json({ message: err.message })
    }
}

app.post("/signup", signup);
app.post("/signin", signin);
app.post("/todo", auth, addtodo);
app.get("/todos", auth, gettodos);


app.listen(process.env.PORT, (err) => {
    console.log(`server is listening to http://localhost:${process.env.PORT}`)
})
const express = require('express');
const path = require('path');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userModel, todoModel } = require('./db');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config({ path: ".env" });
mongoose.connect(process.env.MONGO_URL);
app.use(express.json());

const signupSchema = z.object({
    username: z.string("provide string username").min(3).max(100),
    email: z.email("provide email address"),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "Password must be at least 8 characters long and contain at least one letter and one number",
    })
})
const signinSchema = z.object({
    username: z.string("provide string username").min(3).max(100),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "Password must be at least 8 characters long and contain at least one letter and one number",
    })
})
async function signup(req, res) {

    const isValidate = signupSchema.safeParse(req.body);
    // console.log(req);
    // console.log(req.body);
    if (isValidate.success) {
        let { username, password, email } = req.body;
        email = email.toLowerCase();
        password = await bcrypt.hash(password, 5);
        const newUser = new userModel({ username, password, email });
        try {
            await newUser.save();
            res.status(201).render(__dirname + "/public/pages/signup.ejs", {
                message: "User added successfully"
            })
        } catch (err) {
            // console.log(err.code)
            let msg = "server error! try again later"
            if (err.code == 11000) {
                msg = "Email already present"
            }
            res.status(409).render(__dirname + "/public/pages/signup.ejs", {
                message: msg
            });
        }
    }
    else {
        const errorMessages = isValidate.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
        })); res.status(400).render(__dirname + "/public/pages/signup.ejs", {
            message: "Invalid input provide",
            error: errorMessages
        })
    }
}

async function signin(req, res) {
    const isValidate = signinSchema.safeParse(req.body);
    // console.log(req.body);
    if (isValidate.success) {
        let { username, password } = req.body;
        let data = await userModel.findOne({
            username
        })
        if (!data) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const correctPass = await bcrypt.compare(password, data.password);
        if (correctPass) {
            console.log("logged in successfully");
            let token = jwt.sign({
                userId: data._id
            }, process.env.JWT_SECRET)
            res.status(200).json({
                token: token
            })
        }
        else {
            res.status(401).json({
                message: "Incorrect Password"
            })
        }
    } else {
        const errorMessages = isValidate.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
        })); res.status(400).json({
            message: "Invalid input provide",
            error: errorMessages
        })
    }
}
function auth(req, res, next) {
    console.log("auth middle ware is running");
    const token = req.headers.token;
    // console.log(token);
    try {
        let data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.userId;
        console.log("now  calling next function")
        next();
    }
    catch (err) {
        console.log("Error block is running ")
        res.status(401).json({
            message: err.message
        })
    }
}
async function addtodo(req, res) {
    let { task, userId } = req.body;
    if (!task) {
        return res.status(400).json({
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
        res.status(500).json({
            message: err.message
        })
    }
}
async function gettodos(req, res) {
    const { userId } = req.body;
    try {
        const todos = await todoModel.find({ userId });
        // console.log(todos);
        if (todos.length == 0) return res.status(404).json({ message: "No todo tasks" });
        else res.status(200).json({ message: todos })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

app.get('/', (req, res) => {
    res.render(__dirname + "/public/pages/signup.ejs");
})
app.get("/signin", (req, res) => {
    res.render(__dirname + "/public/pages/signin.ejs");
})
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/todo", auth, addtodo);
app.get("/fake", (req, res) => {
    console.log("in the fake function")
    res.render(__dirname + "/public/pages/fake.ejs");
})
app.get("/todo", auth, (req, res) => {
    console.log("in the todoRoute function")
    res.sendFile(__dirname + "/public/pages/todo.ejs");
})

app.get("/todos", auth, gettodos);


app.listen(process.env.PORT, (err) => {
    console.log(`server is listening to http://localhost:${process.env.PORT}`)
})
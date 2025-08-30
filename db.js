const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;





const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: String,
    password: String
})

const todoSchema = new mongoose.Schema({
    task: String,
    isDone: Boolean,
    userId: ObjectId
})

const userModel = mongoose.model("users", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = { userModel, todoModel };
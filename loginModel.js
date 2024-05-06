require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
})

module.exports = mongoose.model("user", loginSchema);
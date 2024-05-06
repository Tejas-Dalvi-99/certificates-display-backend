require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const certificateSchema = new mongoose.Schema({
    img: String,
})

module.exports = mongoose.model("certificate", certificateSchema);
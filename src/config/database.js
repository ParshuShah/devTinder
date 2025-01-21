const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://learnerparshuram:2Uzl8Ja6vvoJz8Id@cluster0.ckgq3.mongodb.net/DEVTINDER");
}

module.exports = connectDB;


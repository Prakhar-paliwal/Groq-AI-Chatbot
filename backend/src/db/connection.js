require("dotenv").config();
const mongoose = require('mongoose');

// MONGODB_URI = "mongodb+srv://prakharpaliwal88:GPbbSxFqK6YkRMpq@cluster0.f02gmyh.mongodb.net/Groq?retryWrites=true&w=majority&appName=Cluster0"

// console.log(process.env)

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to MongoDB");
    }
}

const dbDisconnect = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from MongoDB");
    }
}

module.exports = { dbConnect, dbDisconnect };

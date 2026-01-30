const mongoose = require("mongoose");
const connectDB = async ()=>{ 
    await mongoose.connect("mongodb+srv://codehacker05_db_user:dXgOrX5oYWagh4dQ@cluster0.1jc84jb.mongodb.net/");
};

module.exports = connectDB;
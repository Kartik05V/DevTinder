//const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const User = require('../models/user');


const userAuth = async (req,res,next )=>{
    try{
        const cookies = req.cookies;
        //res.send(cookie);
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid token");
        };
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$05");
        const { _id } = decodedMessage;

        const user = await User.findById(_id);
        if (!user) {
        throw new Error("User does not exist");
        };
        req.user = user;// attaching the user to the req object body
        next();
        
    }
    catch(err){
        res.status(400).send("Something went wrong: "+ err.message);
    };
};

module.exports={
    userAuth,
}
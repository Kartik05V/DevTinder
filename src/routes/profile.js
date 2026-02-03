const {userAuth} = require("../middlewares/auth.js");
const express = require('express');
const { validateEditProfileData } = require("../utils/validate.js");
const user = require("../models/user.js");
const profileRouter = express.Router()

profileRouter.get("/profile/view",userAuth ,async (req,res)=>{
    try {
        const user = req.user;
        res.send(user);
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    };
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        validateEditProfileData(req);
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        loggedInUser= req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]=req.body[key];
        });
        
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
    

module.exports = profileRouter;
const { validateSignUpData } = require("../utils/validate.js");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const express = require('express')
const authRouter = express.Router()

authRouter.post("/signup", async (req,res)=>{
    try{
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //   Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User registered successfully")
    } catch (err){
        res.status(400).send("Error Saving the user: "+ err.message);
    }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials ");
    }
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
        // Create a JWT Token
        //const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$05");
        const token = await user.getJWT();

        // Add the token to cookie and send the response back to the user
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),//expire after 8 hrs
        });
        res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials ");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  };
});

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.send("Logout successful ")
});

module.exports = authRouter;
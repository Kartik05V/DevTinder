const { userAuth } = require("../middlewares/auth.js");
const express = require("express");
const { validateEditProfileData } = require("../utils/validate.js");
const user = require("../models/user.js");
const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/updatepassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!oldPassword || !newPassword) {
      throw new Error("Please provide both Old and New Passwords");
    }

    const isMatch = await loggedInUser.validatePassword(oldPassword);
    if (!isMatch) {
      throw new Error("Password Entered is Invalid");
    }
    //console.log(isMatch);

    //const isSame = await loggedInUser.validatePassword(newPassword);
    // if (isSame) {
    //   throw new Error("New Password cannot be same as Old Password");
    // }
    if (oldPassword === newPassword) {
      throw new Error("New Password cannot be same as Old Password");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please enter a strong Password!");
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = newHashPassword;
    await loggedInUser.save();

    // SECURITY: INVALIDATE OLD SESSION
    // A: Force Logout (Safer)
    res.cookie("token", null, { expires: new Date(0) }); // Delete cookie

    // B: Keep Logged In (Better UX) -> You must send a NEW token here
    // const newToken = await loggedInUser.getJWT();
    // res.cookie("token", newToken, {expires: new Date(Date.now() + 8 * 3600000),});

    res.json({
      message: "Password updated successfully. Please login again.",
      success: true,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;

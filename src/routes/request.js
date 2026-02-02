const {userAuth} = require("../middlewares/auth.js");
const express = require('express')
const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + " sent the connect request!");
});

module.exports = requestRouter;
const express = require("express");
const connectDB = require("./config/database");

const app = express();
//BEFORE DATABASE CREATION
// app.use("/",(req,res,next)=>{
//     //res.send("hello");
//     next();
// });

// app.use("/user",(req,res,next)=>{
//     //res.send("hello user");
//     //middleware
//     console.log("hello user");
//     next();
// },(req,res)=>{
//     res.send("hello user2");
// });
// app.listen(7777,()=>{
//     console.log("server on 7777");
// });

//AFTER DATABASE CREATION
connectDB().then(() => {
  console.log("Database connection established successfully");
  app.listen(7777, () => {
    console.log("server on 7777");
  });
}).catch((err)=>{
    console.error("Database cannot be connected");
});

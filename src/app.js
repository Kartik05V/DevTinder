const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
//const { default: mongoose } = require("mongoose");
//const jwt = require("jsonwebtoken");

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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/user", async (req,res)=>{
//     const userEmail = req.query.emailId;
//     //console.log(req.body);
//     try{
//         const user = await User.findOne({emailId : userEmail});
//         if(!user){
//             res.status(404).send("User Not Found");
//         }
//         else{
//             res.send(user);
//         }
//     }
//     catch (err){
//         res.status(400).send("Something went wrong");
//     };
// });

// app.get("/feed",async (req,res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }
//     catch (err){
//         res.status(400).send("Something went wrong");
//     };
// });

// app.delete("/user",async (req,res)=>{
//     const userId = req.body.userId;
//     //console.log(userId);
//     try{
//         const user = await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully")
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     };
// });

// app.patch("/user/:userId", async (req,res)=>{
//     const data = req.body;
//     const userId = req.params.userId;
//     // any other data field that is sent in the body of the request
//     // that is not in the schema will be ignored by the api.

//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) =>ALLOWED_UPDATES.includes(k));
//         if (!isUpdateAllowed) {
//             throw new Error("Update not allowed");
//         }
//         if (data?.skills?.length > 10) {
//             throw new Error("Skills cannot be more than 10");
//         }
//         if (data?.skills && data?.skills?.length > 0) {
//             const uniqueSkills = [...new Set(data?.skills)];
//             if (uniqueSkills.length !== data?.skills.length) {
//                 throw new Error("Duplicate skills are not allowed");
//             };
//         }
//         const user = await User.findByIdAndUpdate({_id : userId}, data,
//              {returnDocument:"after", runValidators : true});
//         res.send("User updated successfully");
//     }
//     catch (err){
//         res.status(400).send("Update Failed "+ err.message);
//     };
// });

// app.patch("/userbyemail/:useremail", async (req,res)=>{
//     const data = req.body;
//     const useremail = req.params.useremail;
//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) =>ALLOWED_UPDATES.includes(k));
//         if (!isUpdateAllowed) {
//             throw new Error("Update not allowed");
//         }
//         if (data?.skills?.length > 10) {
//             throw new Error("Skills cannot be more than 10");
//         }
//         if (data?.skills && data?.skills?.length > 0) {
//             const uniqueSkills = [...new Set(data?.skills)];
//             if (uniqueSkills.length !== data?.skills.length) {
//                 throw new Error("Duplicate skills are not allowed");
//             };
//         }
//         const user = await User.findOneAndUpdate({emailId : useremail}, data, {returnDocument:"after" ,
//              runValidators : true });
//         res.send("User updated successfully by emailId");
//     }
//     catch (err){
//         res.status(400).send("Update Failed "+ err.message);
//     };
// });

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(7777, () => {
      console.log("server on 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });

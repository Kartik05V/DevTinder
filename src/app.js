const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");



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
app.use(express.json());

app.post("/signup", async (req,res)=>{
    // Creating a new instance of the User model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User registered successfully")
    } catch (err){
        res.status(400).send("Error Saving the user: "+ err.message);
    }
});

app.get("/user", async (req,res)=>{
    const userEmail = req.query.emailId;
    //console.log(req.body);
    try{
        const user = await User.findOne({emailId : userEmail});
        if(!user){
            res.status(404).send("User Not Found");
        }
        else{
            res.send(user);
        }
    }
    catch (err){
        res.status(400).send("Something went wrong");
    };
});

app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }; 
});

app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    //console.log(userId);
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    }catch(err){
        res.status(400).send("Something went wrong");
    };
});

app.patch("/user", async (req,res)=>{
    const data = req.body;
    const userId = req.body.userId;
    // any other data field that is sent in the body of the request 
    // that is not in the schema will be ignored by the api. 

    try{
        const user = await User.findByIdAndUpdate({_id : userId}, data, {returnDocument:"after"});
        res.send("User updated successfully");
    }
    catch (err){
        res.status(400).send("Something went wrong");
    };
});

app.patch("/userbyemail", async (req,res)=>{
    const data = req.body;
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndUpdate({_id : userId}, data, {returnDocument:"after"});
        res.send("User updated successfully by emailId");
    }
    catch (err){
        res.status(400).send("Something went wrong");
    };
});

connectDB().then(() => {
  console.log("Database connection established successfully");
  app.listen(7777, () => {
    console.log("server on 7777");
  });
}).catch((err)=>{
    console.error("Database cannot be connected");
});

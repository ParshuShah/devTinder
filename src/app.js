const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 4444;
const User = require("./models/User");

//making an API to add the data into the DB.
app.post("/signup", async (req, res)=>{
    //Creating a new Instance of the User Model
    const user = new User({
        firstName : "virat",
        lastName : "Kohli",
        emailId : "virat@kohli.com",
        password : "virat123",
    });

   try{ 
    await user.save();
    res.send("User added Successfully");   
   }catch(err){
    res.status(400).send("Error saving the User" +err.message);
   } 
});


//Established the DB Connection...
connectDB().then(
    ()=>{
        console.log("Database connnection Established...");
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        });
    }).catch((err)=>{
        console.log("Database cannot be connected!!")
});



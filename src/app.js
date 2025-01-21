const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 4444;
const User = require("./models/User");

app.use(express.json());

//making an API to add the data into the DB.
app.post("/signup", async (req, res)=>{
    //Creating a new Instance of the User Model
    const user = new User(req.body);

   try{ 
    await user.save();
    res.send("User added Successfully");   
   }catch(err){
    res.status(400).send("Error saving the User" +err.message);
   } 
});

//getUser API
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail});
        
        if(users.length ===0 ){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong..!" + err.message);
       } 
})

//FEED API - GET /feed = get all the users from the database
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong..!" + err.message);
    }
})

//delete API
app.delete("/user", async(req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id : userId});
        // const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");
    }catch(err){
        res.status(400).send("Something went wrong ");
    }
})

//UPDATE API
app.patch("/user", async (req, res) =>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id : userId}, data);
        res.send("User Updated successfully");
        
    }catch(err){
        req.status(400).send("Something went wrong ");
    }

})
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



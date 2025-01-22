const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 4444;
const User = require("./models/User");
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require("bcrypt");

app.use(express.json());

//making an API to add the data into the DB.
app.post("/signup", async (req, res)=>{

try{ 
    //validation of data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash)
    
    //Creating a new Instance of the User Model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });

   
    await user.save();
    res.send("User added Successfully");   
   }catch(err){
    res.status(400).send("Error saving the User" +err.message);
   } 
});

//Login API
app.post("/login" , async(req, res) => {
    try{
        const { emailId, password} = req.body;
        //second emailId is the email by req.body means by the user;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invaid Credentials");
        }
        //user.password is the encrypt password inside the db
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successfully");
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("ERROR : " +err.message)
    }
})

//getUser by email API 
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
app.patch("/user/:userId", async (req, res) =>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
    const ALLOWED_UPDATES = ["userId", "photoURL", "about", "gender", "age", "skills"];
    
    const isUpdateAllowed = Object.keys(data).every((k)=>(ALLOWED_UPDATES.includes(k)));
    
    if(!isUpdateAllowed) { throw new Error("update not Allowed"); }
    

    const user = await User.findByIdAndUpdate({_id : userId}, data,{
            returnDocument : "after",
            runValidators : true,
        });
        res.send("User Updated successfully");
        
    }catch(err){
        res.status(400).send("UPDATE FAILED : " + err.message);
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



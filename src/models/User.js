const mongoose = require("mongoose");
const validator = require("validator");

const userScheme =  mongoose.Schema({
    firstName: {type : String, required : true,},
    lastName : {type : String, },
    emailId : {type : String, required:true,
         lowercase: true,
         unique:true,
         trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+value);
            }
        }
        },
    password : {type : String, required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong password: "+value);
            }
        }
    },
    age : {type : Number, min:18},
    gender : {type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoURL : {type:String, default : "https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: "+value);
            }
        }
    },
    about : {type: String, default :  "This is a default about of the User"},
    skills : {type : String},
},
{ timestamps : true, })
module.exports = mongoose.model("User" , userScheme);


    
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 4444;
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


//Established the DB Connection...
connectDB().then(
    () => {
        console.log("Database connnection Established...");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        });
    }).catch((err) => {
        console.log("Database cannot be connected!!")
    });



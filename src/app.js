const express = require("express");
const app = express();
const port = 4444;
app.get('/' , (req, res) => {
    res.send("Hello world from Parshuram Kumar");
})


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})
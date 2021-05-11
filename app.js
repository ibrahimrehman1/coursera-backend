const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hi");
})

app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`));
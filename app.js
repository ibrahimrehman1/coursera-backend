const express = require("express");
const cors = require("cors");
const {signupPost, getUsername, loginPost} = require("./controllers/signup");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(cookieParser());



/* REST API Endpoints */
app.post("/signup", signupPost);
app.post("/username", getUsername);
app.post("/login", loginPost);





app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`));
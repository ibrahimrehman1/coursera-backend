const express = require("express");
const cors = require("cors");
const {signupPost} = require("./controllers/signup");
const cookieparser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(cookieparser())


/* REST API Endpoints */
app.post("/signup", signupPost)





app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`));
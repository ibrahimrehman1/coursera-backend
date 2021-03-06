const express = require("express");
const cors = require("cors");
const {signupPost, loginPost, username} = require("./controllers/signup");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());

/* REST API Endpoints */
app.post("/signup", signupPost);
app.post("/login", loginPost);
app.post("/username", username);

app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`));
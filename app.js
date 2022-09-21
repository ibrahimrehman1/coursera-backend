const express = require("express");
const cors = require("cors");
const { signupPost, loginPost, username } = require("./controllers/signup");
const {PORT} = require("./utils/config");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* REST API Endpoints */
app.post("/signup", signupPost);
app.post("/login", loginPost);
app.post("/username", username);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

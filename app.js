const express = require("express");
const cors = require("cors");
const { signup } = require("./controllers/signup");
const { login } = require("./controllers/login");
const { username } = require("./controllers/username");
const {PORT} = require("./utils/config");
const {Logger} = require('./utils/logger')

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* REST API Endpoints */
app.post("/signup", signup);
app.post("/login", login);
app.post("/username", username);

app.listen(PORT, () => Logger.logInfo(`Server Running on PORT ${PORT}`));

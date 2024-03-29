const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { MONGODB_URI } = require("../utils/config");
const { Logger } = require("../utils/logger");

function createToken(id) {
  return jwt.sign({ id }, "Coursera Key", { expiresIn: 60 * 60 * 24 * 3 });
}

module.exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  Logger.logInfo(req.body);
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      let user = await User.create({ fullname, email, password });
      let token = createToken(user._id);
      res.status(201).json({ userID: user._id, token, username: fullname });
    } catch (err) {
      Logger.logError(err);
      res.status(401).json({ error: err.message });
    }
  } catch (e) {
    res.status(500).json({ status: "Unable to connect to the database!" });
  }
};

const User = require("../models/User");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config");
const { Logger } = require("../utils/logger");

module.exports.username = async (req, res) => {
  let token = req.body.token;
  Logger.logInfo(token);
  jwt.verify(token, "Coursera Key", async (err, decoded) => {
    try {
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      try {
        Logger.logInfo(decoded);
        let user = await User.findById({ _id: decoded.id });
        res.status(200).json({ username: user.fullname });
      } catch (err) {
        Logger.logError(err);
        res.status(401).json({ error: err.message });
      }
    } catch (err) {
      res.status(500).json({ status: "Unable to connect to the database!" });
    }
  });
};

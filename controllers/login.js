const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config");
const { Logger } = require("../utils/logger");

function createToken(id) {
  return jwt.sign({ id }, "Coursera Key", { expiresIn: 60 * 60 * 24 * 3 });
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    Logger.logInfo(req.body);
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      let user = await User.findOne({ email });
      let check = await bcrypt.compare(password, user.password);
      if (check) {
        let token = createToken(user._id);
        res
          .status(201)
          .json({ userID: user._id, token, username: user.fullname });
      } else {
        res.status(404);
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  } catch (e) {
    res.status(500).json({ status: "Unable to connect to the database!" });
  }
};

const mongoose = require("mongoose");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");


function createToken(id){
    return jwt.sign({id}, "Coursera Key", {expiresIn: 3600})
}


module.exports.signupPost = (req, res) =>{
    const [fullname, email, password] = req.body;
    mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology: true});
    let user = await User.insert({fullname, email, password});
    let token = createToken(user._id);
    res.cookie("jwt", token, {maxAge: 36000})
    res.json({userID: user._id});
}
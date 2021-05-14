const mongoose = require("mongoose");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const uri = "mongodb+srv://Ibrahim:naveed12345@courseracluster.pxm9r.mongodb.net/CourseraDatabase?retryWrites=true&w=majority"
const bcrypt = require("bcrypt");

function createToken(id){
    return jwt.sign({id}, "Coursera Key", {expiresIn: 60*60*24*3})
}

module.exports.signupPost = async (req, res) => {
    const {fullname, email, password} = req.body;
    let status = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let user = await User.create({fullname, email, password});
    console.log(user)
    let token = createToken(user._id);
    res.cookie("jwt", token, {maxAge: 60*60*24*3*1000, httpOnly: true})
    res.status(201).json({userID: user._id, token});

}


module.exports.getUsername = async (req, res) =>{
    let status = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let user = await User.findById({_id: req.body.userID})
    res.status(200).json({fullname: user.fullname})
}


module.exports.loginPost = async (req, res) =>{
    const {email, password} = req.body;
    let status = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let user = await User.findOne({email});
    let check = await bcrypt.compare(password, user.password);
    if (check){
        res.status(200).json({userID: user._id})
    }else{
        res.status(404);
    }
}
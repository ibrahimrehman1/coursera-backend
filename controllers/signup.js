const mongoose = require("mongoose");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const URI = "mongodb+srv://Ibrahim:naveed12345@courseracluster.pxm9r.mongodb.net/CourseraDatabase?retryWrites=true&w=majority"

function createToken(id){
    return jwt.sign({id}, "Coursera Key", {expiresIn: 60*60*24*3});
}

module.exports.signupPost = async (req, res) => {
    const {fullname, email, password} = req.body;
    try{
        mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
        try{
            let user = await User.create({fullname, email, password});
            let token = createToken(user._id);
            res.status(201).json({userID: user._id, token, username: fullname});
        }catch(err){
            console.log(err);
            res.status(401).json({error: err.message});
        }
    }catch(e){
        res.status(500).json({"status": "Unable to connect to the database!"});
    }
}

module.exports.username = async (req, res) =>{
    let token = req.body.token;
    jwt.verify(token, "Coursera Key", async (err, decoded)=>{
        try{
            mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
            try{
                let user = await User.findById({_id: decoded.id});
                res.status(200).json({username: user.fullname})
            }catch(err){
                console.log(err);
                res.status(401).json({error: err.message});
            }
        }catch(err){
            res.status(500).json({"status": "Unable to connect to the database!"});
        }
    })

}

module.exports.loginPost = async (req, res) =>{
    try{
        const {email, password} = req.body;
        console.log(req.body);
        mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
        try{
            let user = await User.findOne({email});
            let check = await bcrypt.compare(password, user.password);
            if (check){
                let token = createToken(user._id);
                res.status(201).json({userID: user._id, token, username: user.fullname});
            }else{
                res.status(404);
            }
        }catch(err){
            res.status(401).json({error: err.message});
        }
    }catch(e){
        res.status(500).json({"status": "Unable to connect to the database!"});
    }
}
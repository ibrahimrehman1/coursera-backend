const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");

let UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full Name is Required!"],
        unique: [true, "This Full Name is Taken!"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email Address is Required!"],
        unique: [true, "This Email Address is Already in use!"],
        validate: [isEmail, "Please Enter a Correct Email Address!"]
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        unique: [true, "This Password is Already Taken!"],
    }
})

UserSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", UserSchema);
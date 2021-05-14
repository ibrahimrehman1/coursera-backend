const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


let UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
    next();
})

module.exports = mongoose.model("User", UserSchema);
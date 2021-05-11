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

UserSchema.pre("save", async (next)=>{
    const salt = await bcrpt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.Model("User", UserSchema);
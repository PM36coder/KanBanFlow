import { Schema, model } from "mongoose";
import { type } from "os";

const userSchema  = new Schema({
    name:{type : String, required: true , trim:true},
    email:{type : String, required: true, unique: true, trim:true, lowercase: true},
    password:{type : String, required: true, minlength:8},
    otp:{type : String , default:null},
    otpExpiry:{type : Date, default:null}
},{timestamps:true})

export const User = model('User', userSchema)
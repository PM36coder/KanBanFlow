import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //! validate inputs
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }
    //! check user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //! hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //! create user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    //! generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    newUser.password = undefined;

    //! set cookie and send response

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("error in user registration:", error);
    res.status(500).json({ message: "internal server error" });
  }
};


const userLogin = async(req,res)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({message:"Please provide email and password"})
    }

    //! check user registered or not
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"Invalid email or password"})
    }

    //! compare password
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(400).json({message:"Invalid email or password"})
    }

    //! generate token
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7d"
    })
    user.password = undefined;
    
    //! set cookie and send response
    res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({message:"User logged in successfully", user})
  } catch (error) {
     console.error("error in user login:", error);
    res.status(500).json({ message: "internal server error" });
  }
}

const userLogout = (req,res)=>{
  try {
        // Token ko empty string se replace kar do aur expiry  (0) set kar do
        res.cookie('token', '', {
            httpOnly: true,
            maxAge: new Date(0), // Ya maxAge: 0
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
}

//get me route

const userGetMe = async(req,res)=>{

  try {
    const user = await User.findById(req.user._id)
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message:"Server Error"})
  }
}

export { userRegister,userLogin,userLogout,userGetMe}
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendOtpMail } from "../utils/resetPasswordEmail.js";

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

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    //! check user registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //! compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //! generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
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
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("error in user login:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const userLogout = (req, res) => {
  try {
    // Token ko empty string se replace kar do aur expiry  (0) set kar do
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: new Date(0), // Ya maxAge: 0
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

//get me route

const userGetMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//! forgot password logic

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    // 1. Inputs check kar
    if (!password || !newPassword) {
      return res.status(400).json({ message: "Please provide both fields" });
    }

    const user = await User.findById(req.user._id);

    // 2. Current Password Check
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // 3. Same Password Check (Security)
    if (await bcrypt.compare(newPassword, user.password)) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old" });
    }

    // 4. Update Password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in updatePassword:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//! reset password logic
const sendOtpUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    //!check user is exists in db

    const existsUser = await User.findOne({ email: email });

    if (!existsUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //otp Generate
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    //save otp in db
    existsUser.otp = otp;
    existsUser.otpExpiry = otpExpiry;

    await existsUser.save();

    //send otp
    await sendOtpMail(existsUser.email, otp);
    res.status(200).json({ message: "OTP sent Successfully" });
  } catch (error) {
    console.error("Error in OTP sending:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    // 1. Initial Validation
    if (!email || !otp || !newPassword) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (newPassword.length < 8) {
      res
        .status(400)
        .json({ message: "New password must be at least 8 characters long." });
      return;
    }

    //check email, OTP, aur expiry date in one go
    const user = await User.findOne({
      email : email,
      otp : otp,
      otpExpiry : {$gt : Date.now()}
    })

// validation
     if(!user){
           
            res.status(400).json({message: 'Invalid or expired OTP/Reset Request.'})
            return
        }

        user.password = await bcrypt.hash(newPassword,10);
        user.otp = null;
        user.otpExpiry = null;

        await user.save()

         // 5. Success
        res.status(200).json({message:'Password reset successful. Please log in.'})
  } catch (error) {
    console.error("Error in password reset:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { userRegister, userLogin, userLogout, userGetMe, updatePassword ,resetUserPassword,sendOtpUser};

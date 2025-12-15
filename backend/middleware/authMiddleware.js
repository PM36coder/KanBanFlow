import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

export const userMiddleware = async(req,res,next)=>{
    try {
        const token  = req.cookies?.token

        if(!token){
            return res.status(401).json({ message: "Authentication invalid , Please login again"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        const user = await User.findById(decoded?.id).select('-password');
        // console.log(user)
        if(!user){
            return res.status(401).json({message:"User not found, Authentication invalid"})
        }
        req.user = user;
        console.log("Middleware executed", req.user)
      next()
        
    } catch (error) {
         return res.status(401).json({ msg: "Token invalid" });
    }
}


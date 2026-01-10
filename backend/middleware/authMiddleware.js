import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

export const userMiddleware = async(req,res,next)=>{
    try {
        const token  = req.cookies?.token

        if(!token){
            return res.status(401).json({ message: "Authentication invalid , Please login again"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await User.findById(decoded?.id).select('-password');
     
        if(!user){
            return res.status(401).json({message:"User not found, Authentication invalid"})
        }
        req.user = user;
       
      next()
        
    } catch (error) {
        console.log(error.message)
         return res.status(401).json({ message: "Token invalid" });
    }
}


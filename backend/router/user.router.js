import express from 'express';
import { userLogin ,userLogout,userRegister } from '../controller/user.controller.js';
import { userMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout',userLogout)
router.get('/me', userMiddleware, (req,res)=>{
    res.status(200).json({message:"You are authorized"})
})

export default router
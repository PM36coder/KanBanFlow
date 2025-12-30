import express from 'express';
import { userLogin ,userLogout,userRegister,userGetMe, updatePassword, sendOtpUser, resetUserPassword } from '../controller/user.controller.js';
import { userMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout',userLogout)
router.post('/send-otp' , sendOtpUser)
router.post('/reset-password', resetUserPassword)
router.post('/update-password' ,userMiddleware,updatePassword)
router.get('/me', userMiddleware,userGetMe )


export default router
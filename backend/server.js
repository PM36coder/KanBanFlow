import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userAuthRouter from './router/user.router.js'
import taskRoutes from './router/tasks.router.js'
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;
app.use(cors(

    {
        origin : "http://localhost:5173", 
        credentials: true,}
));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/v1/auth', userAuthRouter)
app.use("/v1/tasks", taskRoutes);



connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
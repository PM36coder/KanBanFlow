import express from "express"
import { userMiddleware } from "../middleware/authMiddleware.js"
import { createTask , updateUserTask, deleteTask , deleteAllTask, getUserTasks } from "../controller/task.controller.js"


const router = express.Router()

router.post('/' , userMiddleware, createTask);
router.get('/', userMiddleware , getUserTasks);
router.put('/:id', userMiddleware, updateUserTask);
router.delete('/:id' , userMiddleware, deleteTask);
router.delete('/delete-all' , userMiddleware, deleteAllTask)

export default router
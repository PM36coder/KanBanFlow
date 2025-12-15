import { Task } from "../model/task.model.js";

//! create task
const createTask = async (req,res)=>{
    try {
        const { title , description } = req.body;
        const userID = req.user?._id

if(!title || !description){
    return res.status(400).json({ message : "Title and Description are required"})
}



        const task = await Task.create({
            title,
            description,
            user : userID
        })

        res.status(201).json({ message : "Task created successfully", task})

    } catch (error) {
        console.log(error)
         res.status(500).json({ message: "Server error" })
    }
}

//! get user all tasks

const getUserTasks = async(req,res)=>{
    try {
        const userId = req.user?._id;
        const tasks = await Task.find({ user : userId}).sort({ createdAt : -1})

        res.status(200).json({ tasks})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: "Server error" });
    }
}

//! update user task

const updateUserTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const userId = req.user?._id;

let updateData = {}
if(title) updateData.title = title
if(description) updateData.description = description;
if(status) updateData.status = status;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//! delete task

const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const userID = req.user?._id
        const task = await Task.findOneAndDelete({
            _id : id,
            user : userID
        })

        if(!task){
            return res.status(400).json({message : "Task not Found"})
        }

        res.status(200).json({message : "Task deleted"})
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

//? Delete all task

const deleteAllTask = async (req, res) => {
    try {
        const userID = req.user?._id;

        
        const result = await Task.deleteMany({ user: userID });

        // result.deletedCount
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No tasks found to delete" });
        }

        res.status(200).json({ message: `All tasks deleted (${result.deletedCount} tasks removed)` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { createTask , getUserTasks ,updateUserTask, deleteTask,deleteAllTask}
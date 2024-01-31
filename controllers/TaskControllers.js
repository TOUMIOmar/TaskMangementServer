const TASK = require('../models/TaskSchema')


const CreateTask=async(req,res)=>{
    try {
        const {title,description,userId}=req.body
        console.log(userId)
        const newTask=await TASK.create({title,description,owner:userId})
        res.status(201).json({msg:"Task Created",newTask})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}

const GetUserTasks=async(req,res)=>{
    try {
        const {userId}=req.body
        console.log(userId)
        const UserTasks=await TASK.find({owner:userId})
        res.status(201).json({msg:"Get User Tasks!",UserTasks})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}
const DeleteUserTask=async(req,res)=>{
    try {
      
        const UserTasks=await TASK.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Task Deleted!"})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}

const UpdateUserTask=async(req,res)=>{
    try {
      
        const UpdateTask=await TASK.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(201).json({msg:"Task Updated!",UpdateTask})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}
module.exports = {CreateTask,GetUserTasks,DeleteUserTask,UpdateUserTask}
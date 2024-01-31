const express=require('express')
const router =express.Router()
const userMiddleware = require('../middleware/UserMiddleware')
const {CreateTask,GetUserTasks,DeleteUserTask,UpdateUserTask}=require('../controllers/TaskControllers')

router.post("/createtask",userMiddleware,CreateTask)
router.get("/getusertasks",userMiddleware,GetUserTasks)
router.delete("/deleteusertask/:id",userMiddleware,DeleteUserTask)
router.put("/updateusertask/:id",userMiddleware,UpdateUserTask)






module.exports =router
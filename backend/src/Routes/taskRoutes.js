const express = require('express');
const { createTask ,updateTask,deleteTask,getAllTasks,getTaskById,getTasksByStatus} = require('../Controllers/taskController');
const authMiddleware=require('../Middleware/authMiddleware')
const router=express.Router();

router.post('/createTask',authMiddleware,createTask)
router.put('/updateTask/:taskId',authMiddleware,updateTask)
router.delete('/deleteTask/:id',authMiddleware,deleteTask)
router.get('/getAllTasks',authMiddleware,getAllTasks)
router.get('/getTaskById/:id',authMiddleware,getTaskById)
router.get('/getTasksByStatus/:status',authMiddleware,getTasksByStatus)

module.exports=router
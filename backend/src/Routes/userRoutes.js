const express = require('express');
const { registerUser, loginUser ,getUserEmail} = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');

const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/userEmail',authMiddleware,getUserEmail)

module.exports=router
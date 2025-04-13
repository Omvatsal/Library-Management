const express=require('express')
const handlePostrequest=require('../controller/signin')
const handleLogin=require('../controller/login')

router=express.Router();

router.route('/signup')
.post(handlePostrequest)

router.route('/login')
.post(handleLogin);

module.exports=router;
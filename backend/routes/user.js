const express=require('express')
const handlePostrequest=require('../controller/signin')
const handleLogin=require('../controller/login')
const {handleforgotrequest}=require('../controller/password')
const {handleResetPassword}=require('../controller/password')
const router = require('./dashboard')


router.route('/signup')
.post(handlePostrequest)

router.route('/login')
.post(handleLogin);

router.route('/forgot-password')
.post(handleforgotrequest)

router.route('/reset-password')
.post(handleResetPassword)

module.exports=router;
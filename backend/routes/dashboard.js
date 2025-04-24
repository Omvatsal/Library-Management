const express = require("express");
const router = express.Router();
const { handleGetDashboard, updateAvatar,handleAvatar, handleupdate } = require("../controller/dashboard");


router.route('/')
.get(handleGetDashboard)
.patch(handleAvatar,updateAvatar);

router.route('/update')
.patch(handleupdate);

module.exports = router;
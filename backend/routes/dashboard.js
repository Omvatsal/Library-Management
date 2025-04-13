const express = require("express");
const router = express.Router();
const { handleGetDashboard } = require("../controller/dashboard");
const { verifyToken } = require("../middlewares/verifytoken");

router.route('/')
.get(handleGetDashboard)

module.exports = router;
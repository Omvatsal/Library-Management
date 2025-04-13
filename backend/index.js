const express=require('express');
const cors=require('cors');
const mongodb=require('./connection')
const UserRouter=require('./routes/user')
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require('./middlewares/verifytoken');


const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

mongodb().then(()=>{
app.use('/',UserRouter)
app.use("/dashboard",verifyToken, dashboardRoutes);
app.listen(8000,()=>{
    console.log("server started at localhost:8000");
})
}
)
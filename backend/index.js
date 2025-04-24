const express=require('express');
const cors=require('cors');
const mongodb=require('./connection')
const UserRouter=require('./routes/user')
const dashboardRoutes = require("./routes/dashboard");
const BookRoutes=require('./routes/books.js');
const verifyToken = require('./middlewares/verifytoken');

console.log(new Date().toISOString()); // Logs current UTC time in ISO format

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongodb().then(()=>{
app.use('/',UserRouter)
app.use('/books',BookRoutes)
app.use("/dashboard",verifyToken, dashboardRoutes);
app.listen(8000,()=>{
    console.log("server started at localhost:8000");
})
}
)
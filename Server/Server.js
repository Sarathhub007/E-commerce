const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authrouter=require('./routes/auth/auth-routes');
const adminproductsRouter=require('./routes/admin/products-routes')
const shopproductsRouter=require('./routes/shop/products-routes');

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((error) => console.log("mongodb is not connected ",error));
const port = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-Type", 
        "Authorization",
        "Cache-Control",
        "Expires",
        "pragma",
    ],
    credentials:true

}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authrouter);
app.use('/api/admin/products',adminproductsRouter)
app.use('/api/shop/products',shopproductsRouter)
app.listen(port,()=>{
    console.log(`the server is started on the port ${port}`)
})
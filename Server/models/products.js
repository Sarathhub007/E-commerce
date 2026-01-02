const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number
},{timestamps:true})



module.exports=mongoose.model('product',productSchema);
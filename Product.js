const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  productId: {
    type:String,
    required:true,
    unique:true
  },
  quantity: {
    type:Number,
    required:true
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports=Product;
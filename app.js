const express=require("express")
const mongoose = require("mongoose");
const app=express();
const Product=require("./Product")

app.use(express.json())
app.post("/products",(req,res)=>{
    const reqBody=req.body;
    reqBody.forEach(async(element)=>{
        if(element.operation=='add'){
           
            const existingProduct=await Product.findOne({productId: element.productId })
            
            if(existingProduct){
                existingProduct.quantity+= +element.quantity;
                await existingProduct.save();
                 console.log(`Product added successfully-${element.productId} `); 
            }else{
                const newProduct=new Product({
                    productId:element.productId,
                    quantity:element.quantity
                })
                await newProduct.save();
                console.log(`Product added successfully-${element.productId}`); 
            }
        }
            else{
              const existingProduct=await Product.findOne({productId: element.productId });
              if(existingProduct){
                existingProduct.quantity-= element.quantity;
                if(existingProduct.quantity==0){
                  await existingProduct.deleteOne({productId:element.id})
                  console.log(`Product Deleted successfully-${element.productId}`)
                }
                await existingProduct.save();
                console.log(
                  `Product removed successfully -${element.productId}`
                ); 
            }else{
              console.log(`Product Not Found-${element.productId}`);
            }
            }
       
    
})
  return res.status(200).json("Request Processed successfully")
})

mongoose
  .connect(
    "mongodb+srv://adminDB:gPb2SMYE9PONJwHN@newcluster.i9i696s.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(3000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });


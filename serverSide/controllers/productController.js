// route for add Product
import {v2 as cloudinary} from "cloudinary"
import Product from "../models/ProductModel.js"
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 =req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];


    const images = [image1 , image2 , image3 , image4].filter((image)=> image !== undefined)

    let imagesUrl =   await Promise.all( images.map(async(img)=> {

    
        let result = await cloudinary.uploader.upload(img.path , {resource_type : "image"})
        return  result.secure_url
    }))
        

    const productData = {
        name,
        description,
        price : Number(price),
        category,
        subCategory,
        sizes : JSON.parse(sizes),
        bestseller : bestseller === "true" ? true : false,
        images : imagesUrl,
        date : new Date()
    }
    
    const product = new Product(productData)
    await product.save()


    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({success : true , products})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message})
        
    }
};

const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id)
        res.json({success : true , message : "Product removed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message})
        
    }
};

const singleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id  )
        res.json({success : true , product})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message})
        
    }
}; 

export { addProduct, getAllProducts, removeProduct, singleProduct };

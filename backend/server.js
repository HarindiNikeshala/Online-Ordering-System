import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/products.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

//create a new product
app.post('/api/products', async (req, res) => {
    const product = req.body; //user will send the product data in the body of the request
    console.log(product);

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    const newProduct = new Product(product);

    try {
        const response = await newProduct.save();
        console.log("Response: ", response);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in create Product:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

//delete a product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    // console.log("id", id)
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

//GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

//Update a product
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// console.log(process.env.MONGO_URL);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

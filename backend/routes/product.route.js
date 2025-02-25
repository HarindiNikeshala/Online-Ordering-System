import express from "express";
import mongoose from "mongoose";

import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.control.js";

const router = express.Router();

//create a new product
router.post('/', createProduct );

//delete a product
router.delete("/:id", deleteProduct);

//GET ALL PRODUCTS
router.get("/", getProducts);

//Update a product
router.put("/:id", updateProduct);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouters from "./routes/product.route.js"


dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRouters);

// console.log(process.env.MONGO_URL);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

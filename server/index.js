import dotenv from 'dotenv';
import connectToDatabase from "./database.js";
import express from 'express';

// Routes
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

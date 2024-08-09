import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import inventarisRoutes from './src/routes/inventarisRoutes.js';
import materialRoutes from './src/routes/materialRoutes.js';
import movementRoutes from './src/routes/movementMaterialRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import productRoutes from './src/routes/productRoutes.js';


dotenv.config();

const app = express();

app.use(cors(  { origin: 'http://localhost:3000' } ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/inventaris', inventarisRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    }
);
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import inventarisRoutes from './routes/inventarisRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import movementRoutes from './routes/movementMaterialRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/inventaris', inventarisRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

export default app;

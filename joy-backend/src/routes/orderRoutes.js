import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export default router;
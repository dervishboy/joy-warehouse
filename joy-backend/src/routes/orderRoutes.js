import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.patch('/:id/status', OrderController.updateStatus);
router.delete('/:id', OrderController.deleteOrder);
router.get('/generateKode', OrderController.generateNextKode);

export default router;
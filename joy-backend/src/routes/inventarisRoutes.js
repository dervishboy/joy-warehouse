import express from 'express';
import InventarisController from '../controllers/inventarisController.js';

const router = express.Router();

router.get('/', InventarisController.getInventaris);
router.post('/', InventarisController.createInventaris);
router.get('/:id', InventarisController.getInventarisById);
router.put('/:id', InventarisController.updateInventaris);
router.delete('/:id', InventarisController.deleteInventaris);

export default router;
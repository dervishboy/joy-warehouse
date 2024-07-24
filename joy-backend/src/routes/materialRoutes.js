import express from 'express';
import MaterialController from '../controllers/materialController.js';

const router = express.Router();

router.get('/', MaterialController.getMaterials);
router.post('/', MaterialController.createMaterial);
router.get('/:id', MaterialController.getMaterialById);
router.put('/:id', MaterialController.updateMaterial);
router.delete('/:id', MaterialController.deleteMaterial);

export default router;
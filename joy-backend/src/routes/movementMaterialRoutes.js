import express from 'express';
import MaterialInOutController from '../controllers/materialInOutController.js';

const router = express.Router();

router.post('/in', MaterialInOutController.materialIn);
router.post('/out', MaterialInOutController.materialOut);
router.get('/in', MaterialInOutController.getAllMaterialIn);
router.get('/out', MaterialInOutController.getAllMaterialOut);
router.get('/:id', MaterialInOutController.getMaterialMovementById);

export default router;
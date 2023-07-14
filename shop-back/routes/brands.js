import express from 'express';

import BrandsController from '../controllers/BrandsController';
import validate from '../middlewares/validate';
import {FindEmptyValueSchema, getValidIdSchema} from '../schema/orders';
import adminAuthorization from '../middlewares/adminAuthorization';

const router = express.Router();

router.post('/create', adminAuthorization, validate(FindEmptyValueSchema), BrandsController.createBrands);
router.put('/update', adminAuthorization, validate(FindEmptyValueSchema), BrandsController.updateBrand);
router.get('/get', BrandsController.getBrands);
router.delete('/delete/:id', adminAuthorization, validate(getValidIdSchema), BrandsController.deleteBrand);

export default router;

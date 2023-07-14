import express from 'express';

import CategoriesController from '../controllers/CategoriesController';
import adminAuthorization from '../middlewares/adminAuthorization';
import validate from '../middlewares/validate';
import { FindEmptyValueSchema, getValidIdSchema } from '../schema/orders';

const router = express.Router();

router.post('/create', adminAuthorization, validate(FindEmptyValueSchema), CategoriesController.createCategories);
router.put('/update', adminAuthorization, validate(FindEmptyValueSchema), CategoriesController.updateCategory);
router.get('/get', CategoriesController.getCategories);
router.delete('/delete/:id', adminAuthorization, validate(getValidIdSchema), CategoriesController.deleteCategory);

export default router;

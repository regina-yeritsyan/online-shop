import express from 'express';
import multer from 'multer';
import HttpError from 'http-errors';
import { v4 as uuidV4 } from 'uuid';
import os from 'os';
import ProductsController from '../controllers/ProductsController';
import adminAuthorization from '../middlewares/adminAuthorization';
import authorizationAllowAll from '../middlewares/authorizationAllowAll';
import {createProductsSchema, getAllSchema, updateProductsSchema} from '../schema/products';
import validate from '../middlewares/validate';
import { getValidIdSchema } from '../schema/orders';

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, os.tmpdir());
      // cb(null, path.join(__dirname, '../public'))
    },
    filename(req, file, cb) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        cb(HttpError(422, 'Invalid file type'));
        return;
      }
      cb(null, `${uuidV4()}_${file.originalname}`);
    },
  }),
});

router.post(
  '/create',
  adminAuthorization,
  upload.single('img'),
  validate(createProductsSchema),
  ProductsController.createProducts,
);

router.put('/update', adminAuthorization, validate(updateProductsSchema), ProductsController.updateProducts);
router.delete('/delete/:id', adminAuthorization, validate(getValidIdSchema), ProductsController.deleteProducts);
router.get('/colors', ProductsController.getColors);

router.get('/getAll', authorizationAllowAll, validate(getAllSchema), ProductsController.getAll);
router.get('/get', adminAuthorization, ProductsController.getProducts);
router.get('/getItem:id', adminAuthorization, validate(getValidIdSchema), ProductsController.getProductItem);
router.get('/get:id', authorizationAllowAll, validate(getValidIdSchema), ProductsController.getOne);

router.post('/createItem/:id', adminAuthorization, upload.single('img'), ProductsController.createProductItem);
router.put('/updateItem/:id', adminAuthorization, upload.single('img'), ProductsController.updateProductItem);
router.delete('/deleteItem/:id', adminAuthorization, validate(getValidIdSchema), ProductsController.deleteProductItem);

export default router;

import express from 'express';
import OrdersController from '../controllers/OrdersController';
import authorization from '../middlewares/authorization';
import adminAuthorization from '../middlewares/adminAuthorization';
import validate from '../middlewares/validate';
import { createOrderItemsSchema, getValidIdSchema } from '../schema/orders';

const router = express.Router();

router.post('/', authorization, validate(createOrderItemsSchema), OrdersController.createOrder);
router.get('/get', authorization, OrdersController.getByUserId);
router.get('/getAll', adminAuthorization, OrdersController.getAllOrders);
router.get('/getItem:id', authorization, validate(getValidIdSchema), OrdersController.getOrderItems);
router.put('/change:id', adminAuthorization, OrdersController.changeOrderStatus);
router.post('/payment', OrdersController.paypal);
router.get('/execute', OrdersController.executePayment);

export default router;

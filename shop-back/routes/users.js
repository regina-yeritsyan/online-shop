import express from 'express';

import UsersController from '../controllers/UsersController';
import authorization from '../middlewares/authorization';
import adminAuthorization from '../middlewares/adminAuthorization';
import validate from '../middlewares/validate';
import {
  confirmCodeSchema,
  forgotSchema,
  loginSchema, passwordChangeSchema, profileUpdateSchema,
  recoverPasswordSchema,
  registerSchema,
  userListSchema,
} from '../schema/users';

const router = express.Router();

router.post('/register', validate(registerSchema), UsersController.register);
router.post('/login', validate(loginSchema), UsersController.login);
router.get('/list', adminAuthorization, validate(userListSchema), UsersController.list);
router.get('/confirm', validate(confirmCodeSchema), UsersController.confirmMail);
router.post('/forgot-password', validate(forgotSchema), UsersController.forgotPassword);
router.get('/confirm-code', validate(confirmCodeSchema), UsersController.confirmCode);
router.put('/recover', validate(recoverPasswordSchema), UsersController.recoverPassword);

router.get('/profile', authorization, UsersController.profile);
router.put('/profile', authorization, validate(profileUpdateSchema), UsersController.profileUpdate);
router.put('/change-password', authorization, validate(passwordChangeSchema), UsersController.changePassword);

router.post('/send', UsersController.sendMessage);

router.delete('/delete/:id', UsersController.deleteUser);

export default router;

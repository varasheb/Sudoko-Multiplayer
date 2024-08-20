import express from 'express';
import * as userController from '../controllers/user.controller';
import { emailValidator, signinValidator, signupValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/getuserinfo', userAuth , userController.getUserInfo);

router.post('/signup', signupValidator, userController.signup);

router.post('/signin', signinValidator, userController.signin);

router.post('/forgetpassword', emailValidator, userController.forgetPassword);


export default router;

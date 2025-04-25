import { changePassword, findUser, login, logout, register, resend, verifyCode } from '../controllers/auth.controller.js';
import express from 'express';
import authValid from '../middleware/authValid.js';
const authRouter = express.Router();


//register route
authRouter.post('/register',register);


//login route
authRouter.post('/login',login);


//find user route using username or email
authRouter.post('/find',findUser);


//forget password route
authRouter.post('/resend',authValid,resend);


//set cookie for user
authRouter.post('/verify',authValid,verifyCode);


//change password route
authRouter.patch('/changepassword',authValid,changePassword);


//logout route
authRouter.post('/logout',logout);


//export 
export default authRouter;
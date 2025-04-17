import { changePassword, login, logout, register, resend, verifyCode } from '../controllers/auth.controller.js';
import express from 'express';
const authRouter = express.Router();


//register route
authRouter.post('/register',register);


//login route
authRouter.post('/login',login);


//forget password route
authRouter.post('/resend',resend);


//set cookie for user
authRouter.post('/verify',verifyCode);


//change password route
authRouter.patch('/changepassword',changePassword);


//logout route
authRouter.post('/logout',logout);


//export 
export default authRouter;
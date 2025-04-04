import { changePassword, confirmEmail, login, logout, register, setCookieLogIn, setCookieRegister } from '../controllers/auth.controller.js';
import express from 'express';
const authRouter = express.Router();


//register route
authRouter.post('/register',register);


//login route
authRouter.post('/login',login);


//forget password route
authRouter.post('/confirmemail',confirmEmail);


//set cookie for user
authRouter.post('/setcookie',setCookieLogIn);


//change password route
authRouter.patch('/changepassword',changePassword);


//logout route
authRouter.post('/logout',logout);


//export 
export default authRouter;
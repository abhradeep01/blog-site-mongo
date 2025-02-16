import { forgetPassword, login, logout, register } from '../controllers/auth.controller.js';

import express from 'express';
const authRouter = express.Router();


//register route
authRouter.post('/register',register);


//login route
authRouter.post('/login',login);


//forget password route
authRouter.patch('/forgetpassword',forgetPassword);


//logout route
authRouter.post('/logout',logout);


//export 
export default authRouter;
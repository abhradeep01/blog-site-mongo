import express from 'express';
import { deleteUser, getUserPosts, userInfo, userPartialUpdate } from '../controllers/user.controller.js';
const userRouter = express.Router();

//user info route
userRouter.get('/:id',userInfo).get('/:id/posts',getUserPosts);

//user info update
userRouter.patch('/:id/change',userPartialUpdate);

//user delete
userRouter.delete('/:id/delete',deleteUser);

//export 
export default userRouter;
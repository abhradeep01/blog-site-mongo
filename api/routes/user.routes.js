import express from 'express';
import { deleteUser, userBookmarked, userInfo, userInfoUpdate, userLiked } from '../controllers/user.controller.js';
const userRouter = express.Router();

//user info route
userRouter.get('/:username',userInfo).get('/:username/bookmarked',userBookmarked).get('/:username/liked',userLiked);


//user info update
userRouter.put('/:username/update',userInfoUpdate);


//user delete
userRouter.delete('/:username/delete',deleteUser);


//export 
export default userRouter;
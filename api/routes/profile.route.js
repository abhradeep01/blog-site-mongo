import express from 'express';
import { bookmarkedPosts, getProfileInfo, getUsersPosts, likedPosts } from '../controllers/profile.controller.js';
const profileRouter = express.Router();


//route for getting own profile info
profileRouter.get('/:username',getProfileInfo);


//route for user's posts
profileRouter.get('/:username/posts',getUsersPosts);


//route for getting bookmarked post 
profileRouter.get('/:username/bookmarked',bookmarkedPosts);


//route for getting liked post
profileRouter.get('/:username/liked',likedPosts)


// export
export default profileRouter;
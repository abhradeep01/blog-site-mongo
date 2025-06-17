import express from 'express';
import { bookmarkedPosts, getProfileInfo, getUsersPosts, likedPosts } from '../controllers/profile.controller.js';
const profileRouter = express.Router();

//route for getting own profile info
profileRouter.get('/',getProfileInfo);

//route for user's posts
profileRouter.get('/posts',getUsersPosts);

//route for getting bookmarked post 
profileRouter.get('/saved',bookmarkedPosts);

//route for getting liked post
profileRouter.get('/liked',likedPosts)

// export
export default profileRouter;
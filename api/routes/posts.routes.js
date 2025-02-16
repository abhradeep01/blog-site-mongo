import express from 'express';
import { addPost, bookmarked, deletePost, getPosts, liked, partialUpdate, unbookmarked, unliked, updatePost } from '../controllers/posts.controller.js';
const postRouter = express.Router();


//get posts route
postRouter.get('/',getPosts);


//post liked route
postRouter.post('/liked/:id',liked)


//post unliked route
postRouter.delete('/unliked/:id',unliked);


//post bookmarked route
postRouter.post('/bookmarked/:id',bookmarked);


//post unbookmarked route
postRouter.delete('/unbookmarked/:id',unbookmarked);


//add post route
postRouter.post('/addpost',addPost);


//update full post route
postRouter.put('/update/:id',updatePost);


//route for update partial post 
postRouter.patch('/change/:id',partialUpdate);


//delete post route
postRouter.delete('/delete/:id',deletePost);


//export
export default postRouter;
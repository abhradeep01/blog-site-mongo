import express from 'express';
import { addPost, deletePost, getPost, getPosts, partialUpdate } from '../controllers/posts.controller.js';
import { isValid } from '../middleware/isValid.js';
const postRouter = express.Router();


//get posts route
postRouter.get('/',getPosts);


//get single post
postRouter.get("/:id",isValid,getPost);


//add post route
postRouter.post('/add',isValid,addPost);


//route for update partial post 
postRouter.patch('/:id/change',isValid,partialUpdate);


//delete post route
postRouter.delete('/:id/delete',isValid,deletePost);


//export
export default postRouter;
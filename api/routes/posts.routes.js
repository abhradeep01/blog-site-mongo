import express from 'express';
import { addPost, deletePost, getPost, getPosts, partialUpdate } from '../controllers/posts.controller.js';
const postRouter = express.Router();


//get posts route
postRouter.get('/',getPosts);


//get single post
postRouter.get("/:id",getPost);


//add post route
postRouter.post('/addpost',addPost);


//route for update partial post 
postRouter.patch('/:id/change',partialUpdate);


//delete post route
postRouter.delete('/:id/delete',deletePost);


//export
export default postRouter;
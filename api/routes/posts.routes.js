import express from 'express';
import { addPost, deletePost, getPost, getPosts, partialUpdate, updatePost } from '../controllers/posts.controller.js';
import { bookmarked, liked, unbookmarked, unliked } from '../controllers/interaction.controller.js';
import { isValid } from '../middleware/isValid.js';
const postRouter = express.Router();


//get posts route
postRouter.get('/',getPosts);


//get single post
postRouter.get("/:id",getPost);


//post liked route
postRouter.post('/:id/liked',liked)


//post unliked route
postRouter.delete('/:id/unliked',unliked);


//post bookmarked route
postRouter.post('/:id/bookmarked',bookmarked);


//post unbookmarked route
postRouter.delete('/:id/unbookmarked',unbookmarked);


//add post route
postRouter.post('/addpost',addPost);


//update full post route
postRouter.put('/:id/update',updatePost);


//route for update partial post 
postRouter.patch('/:id/change',partialUpdate);


//delete post route
postRouter.delete('/:id/delete',deletePost);


//export
export default postRouter;
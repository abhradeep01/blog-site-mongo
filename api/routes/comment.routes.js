import express from 'express';
import { addComment, deleteComment, editComment, getPostsAllComments } from '../controllers/comment.controller.js';
const commentRouter = express.Router();

//get posts comment
commentRouter.get('/:id',getPostsAllComments);

//add comment route
commentRouter.post("/:id/add",addComment);

//edit comment route
commentRouter.patch("/:id/edit",editComment);

//delete comment route
commentRouter.delete("/:id/delete",deleteComment);


export default commentRouter;
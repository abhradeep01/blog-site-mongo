import express from 'express';
import { addComment, deleteComment, editComment } from '../controllers/interaction.controller.js';
const commentRouter = express.Router();

//add comment route
commentRouter.post("/add",addComment);


//edit comment route
commentRouter.patch("/edit",editComment);


//delete comment route
commentRouter.delete("/delete",deleteComment);


export default commentRouter;
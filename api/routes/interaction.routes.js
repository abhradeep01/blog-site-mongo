import express from 'express';
import { liked, saved, unliked, unsaved } from '../controllers/interaction.controller.js';
const interactionRouter = express.Router();

//post liked 
interactionRouter.post('/:id/liked',liked);

//post unliked
interactionRouter.delete('/:id/unliked',unliked);

//post saved route
interactionRouter.post('/:id/saved',saved);

//post unsaved routes
interactionRouter.delete('/:id/unsaved',unsaved);

//export
export default interactionRouter;
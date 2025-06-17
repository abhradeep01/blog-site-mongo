import express from 'express';
import { postDelete, postImgUpload, userImgDelete, userImgUpload } from '../services/cloudUpload.js';
import { isValid } from '../middleware/isValid.js';
const uploadRouter = express.Router();

//user image upload service
uploadRouter.post('/userimg',userImgUpload);

//user img delete
uploadRouter.delete('/userimg',isValid,userImgDelete);

//post image upload
uploadRouter.post('/postimg',isValid,postImgUpload);

//post image delete
uploadRouter.delete('/postimg',isValid,postDelete);


export default uploadRouter;
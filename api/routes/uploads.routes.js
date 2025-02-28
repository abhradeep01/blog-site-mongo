import express from 'express';
import { postImgUpload, userImgUpload } from '../services/cloudUpload.js';
import { isValid } from '../middleware/isValid.js';
const uploadRouter = express.Router();

//user image upload service
uploadRouter.post('/userimg',userImgUpload);


//post image upload
uploadRouter.post('/postimg',isValid,postImgUpload);


export default uploadRouter;
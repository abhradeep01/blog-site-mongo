import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/posts.routes.js';
import userRouter from './routes/user.routes.js';
import connectDb from './config/db.config.js';
import uploadRouter from './routes/uploads.routes.js';
import { isValid } from './middleware/isValid.js';
import commentRouter from './routes/comment.routes.js';


//app
const app = express();      

//middlewares
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_ORIGIN,
    credentials:true,
    allowedHeaders:['Content-Type','Authorization','X-Custom-Header'],
}));
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));


//api routes
app.use('/user',isValid,userRouter);
app.use('/posts',isValid,postRouter);
app.use('/auth',authRouter);
app.use('/upload',uploadRouter);
app.use('/comment',isValid,commentRouter);
app.all('*',(req,res,next)=>{
    return res.status(404).json(`can't find ${req.originalUrl} on the server`)
});


//port 
app.listen(process.env.PORT,()=>{
    console.log('connected!');
    connectDb();
});
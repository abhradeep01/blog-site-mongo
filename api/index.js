import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/posts.routes.js';
import userRouter from './routes/user.routes.js';
import connectDb from './config/db.config.js';
import uploadRouter from './routes/uploads.routes.js';
import { isValid } from './middleware/isValid.js';
import commentRouter from './routes/comment.routes.js';
import profileRouter from './routes/profile.route.js';
import { errorHandler } from './middleware/errorHandler.js';
import interactionRouter from './routes/interaction.routes.js';


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

//setting template engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

//api routes
app.use('/api/user',isValid,userRouter);
app.use('/api/posts',postRouter);   
app.use('/api/auth',authRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/comment',isValid,commentRouter);
app.use('/api/profile',isValid,profileRouter);
app.use('/api/interaction',isValid,interactionRouter);
app.all('*',(req,res,next)=>{
    const err = new Error(`can't find ${req.originalUrl} route on the server!`);
    err.name = `route not found!`;
    err.statusCode = 404;
    return next(err)
});

//global error handler middleware
app.use(errorHandler);

export default app;
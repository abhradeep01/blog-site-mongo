import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/posts.routes.js';
import userRouter from './routes/user.routes.js';

//app
const app = express();

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));


//api routes
app.use('/api/user',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/auth',authRouter)


//port 
app.listen(process.env.PORT,()=>{
    console.log('connected!');
});
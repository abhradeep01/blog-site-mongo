import mongoose from 'mongoose';
import 'dotenv/config';

//connect db
const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_LOCAL);
        console.log('datbase connected!');
    }catch(err){
        console.log(err);
    }
}

export default connectDb;
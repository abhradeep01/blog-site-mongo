import mongoose from 'mongoose';

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_LOCAL);
        console.log('datbase connected!');
    }catch(err){
        console.log(err);
    }
}
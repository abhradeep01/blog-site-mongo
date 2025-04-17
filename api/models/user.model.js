import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{ 
            type: String,
            required: [true,"name is requiredf field!"]
        },
        username:{ 
            type: String,
            required: [true,"username is required field!"],
            unique: true 
        },
        email:{ 
            type:String,
            required: [true,"email is required field!"],
            unique: true
        },
        password:{ 
            type:String,
            required:[true,"password is required field!"]
        },
        img:{
            type: String,
            required:[true,"img is required field!"]
        },
        bio:{
            type:String
        },
        otp:{
            type:Number,
            default:null
        },
        isVerified:{
            type:Boolean,
            required:true,
            default:false
        },
        savedPosts:{ 
            type: [Schema.Types.ObjectId,],
            ref:'Post',
            default: [] 
        },
        likedPosts:{ type: [Schema.Types.ObjectId],
            ref:'Post',
            default: [] 
        }
    },
    { 
        timestamps:true,
        _id:true
    }
);


export default mongoose.model('User',userSchema);
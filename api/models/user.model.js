import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type:String,
            required: true,
            unique: true
        },
        password:{
            type:String,
            required:true
        },
        img:{
            type: String,
            required:true       
        },
        savedPosts:{
            type: [String],
            default: []
        },
        likedPosts:{
            type: [String],
            default: []
        }
    },
    {timestamps:true}
)

export default mongoose.model('User',userSchema);
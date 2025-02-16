import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        name:{
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        img:{
            type: String,
            required: true
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
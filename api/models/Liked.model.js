import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        post:{
            type:Schema.Types.ObjectId,
            ref:'Post',
            required:true
        }
    },
    {timestamps:true}
)

export default mongoose.model('Liked',LikeSchema)
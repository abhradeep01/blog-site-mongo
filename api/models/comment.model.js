import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        post:{
            type: Schema.Types.ObjectId,
            required: true,
            ref:'Post'
        },
        description:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

export default mongoose.model('Comment',commentSchema);
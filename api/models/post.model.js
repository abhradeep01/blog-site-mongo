import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            require: true,
            ref:'User'
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        upload_date:{
            type:Date,
            required:true
        },
        last_updated:{
            type: Date
        },
        visit:{
            type:Number,
            default:0
        },
        liked:{
            type:[Schema.Types.ObjectId],
            ref:'User',
            default:[]
        },
        bookmarked:{
            type:[Schema.Types.ObjectId],
            ref:'User',
            default:[]
        }
    },
    {timestamps:true}
)

export default mongoose.model('Post',postSchema);
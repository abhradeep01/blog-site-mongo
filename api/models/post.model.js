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
            type: Date,
            required: true
        },
        visit:{
            type:Number,
            required: true
        }
    }
)

export default mongoose.model('Post',postSchema);
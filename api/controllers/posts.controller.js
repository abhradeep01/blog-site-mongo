import Post from "../models/post.model.js";
import { verifyToken } from "../services/auth.js";
import User from '../models/user.model.js';
import asyncHandler from "../middleware/asyncHandler.js";
import { apiresponse } from "../utilities/apiResponse.js";
import { apiError } from "../utilities/apiError.js";

//all posts function
const getPosts = asyncHandler(async (req,res,next) =>{
    const category = req.query.cat;

    //posts
    var posts ;

    //category wise posts
    if(category){
        posts = await Post.findOne({category:category});
    }
    //if all posts
    posts = await Post.find({});

    return res.status(200).send(posts)
})


//get post details function
const getPost = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //if id exists 
    if(!postId){
        response = new apiError(400,"Invalid Post Id")
        return res.status(400).json(response)
    }

    //post info retrive
    const postInfo = await Post.findById(postId,"userId title description img category upload_date createdAt visit liked bookmarked").then(docs=>{
        return {
            success:true,
            docs
        }
    }).catch(err=>{
        return {
            success:false,
            err
        }
    })

    //if post exists
    if(!postInfo.success){
        response = new apiError(404,"Post not found")
        return res.status(404).json(response)
    }

    //user
    const userInfo = await User.findOne({_id:postInfo.docs.userId},"username img")

    response = new apiresponse("Post has found",200,{
        post:postInfo.docs,
        userInfo
    })
    //response post
    return res.status(200).json(response);
});


//addpost function
const addPost = asyncHandler(async (req,res,next) =>{
    // post info 
    const post = req.body
    var response;

    //userId 
    const token = req.cookies.blog_token
    const userInfo = verifyToken(token);

    //userdata
    const user = await User.findOne({username:userInfo.result.username});

    // post upload
    await Post.create({
        userId:user._id,
        title: post.title,
        description: post.description,
        img:post.img,
        category:post.category,
        upload_date: Date.now()
    });

    response = new apiresponse("Post Uploaded successfully",200)
    return res.status(200).json(response)
})


//update post function
const updatePost = asyncHandler(async (req,res,next) =>{
    //post new info 
    const newInfo = req.body;
    var response;

    //is body empty
    if(!(newInfo.title && newInfo.description && newInfo.img)){
        response = new apiError(400,"Please fill all fields");
        return res.status(400).json("please Fill all fields")
    }

    //update post
    const updatePost = await Post.updateOne({_id:req.params.id},{$set:{
        title:newInfo.title,
        description:newInfo.description,
        img:newInfo.img
    }}).then(res=>res.acknowledged).catch(err=>{
        console.log(err);
        if(err) return false;
    });

    //if post not updated
    if(!updatePost){
        response = new apiError(400,"Post hasn't updated");
        return res.status(404).json(response)
    }

    response = new apiresponse("Post updated successfully",200);
    //response
    return res.status(200).send(`Post updated successfully`);
})


//partial update function
const partialUpdate = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //post id check
    if(!postId){
        response = new apiError(400,"Invalid posr Id");
        return res.status(401).json(response);
    }

    //update post 
    const updateResult = await Promise.all(
        Object.keys(req.body).map(async (key)=>{
            return await Post.updateOne({_id:postId},{$set:{[key]:req.body[key]}})
            .then(res=>res.acknowledged).catch(err=>err.acknowledged);
        })
    );

    //post update or not
    if(!updateResult[0]){
        response = new apiError(400,"Post hasn't updated")
        return res.status(400).json(response);
    }

    response = new apiresponse(`Post's ${Object.keys(req.body).map((key,index)=>index===0?key:" "+key)} changed successfully`,200);
    //response
    return res.status(200).json(response);   
})


//delete post function
const deletePost = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //valid Id
    if(!postId){
        response = new apiError(400,"Invalid Post Id");
        return res.status(400).json(response)
    }

    //delete post
    const removePost = await Post.deleteOne({_id:postId}).then(res=>{
        return res.acknowledged
    }).catch(err=>{
        if(err){
            return false;
        }
    });

    //if not delete
    if(!removePost){
        response = new apiError(404,"Post isn't deleted");
        return res.status(400).json(response)
    }

    response = new apiresponse(`(id:${postId}) is deleted successfully`,200);
    return res.status(200).json(response)
})


//exports 
export { getPosts, getPost, addPost, partialUpdate, updatePost, deletePost }
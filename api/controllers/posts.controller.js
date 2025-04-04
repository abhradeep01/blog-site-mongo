import Post from "../models/post.model.js";
import { verifyToken } from "../services/auth.js";
import User from '../models/user.model.js';
import asyncHandler from "../middleware/asyncHandler.js";
import { apiresponse } from "../utilities/apiResponse.js";
import { apiError, notFoundError } from "../utilities/CustomError.js";

//all posts function
const getPosts = asyncHandler(async (req,res,next) =>{
    const type = req.query.cat;
    var response;
    //posts
    var posts ;
    //ads
    var ads;
    //banner
    var banners;

    //category wise posts return
    if(type){
        // posts with specified category
        posts = await Post.find({category:type},{bookmarked:0},{limit:4}).populate({path:'userId',select:{username:1}});
        //post ads with specified category
        ads = await Post.find({category:type},{title:1,img:1,category:1,updatedAt:1},{limit:4});
        //post banner with specified category
        banners = await Post.find({category:type},{title:1,img:1,category:1,updatedAt:1},{limit:1});

        //posts not found 
        if(posts.length===0){
            response = new notFoundError({
                name:"category error",
                message:`('${type}') type posts are not found!`,
            });
            return res.status(response.statusCode).json(response)
        }

        const renamePosts = posts.map(post=>{
            const {userId, commented, ...rest} = post.toObject();
            return {
                ...rest,
                commentCount:commented.length,
                user:userId
            }
        })

        //response
        response = new apiresponse(`${type} type posts`,200,{posts:renamePosts, ads, banners});
        return res.status(response.statusCode).json(response)
    }

    //if all posts
    posts = await Post.find({},{},{limit:4}).populate('userId','username');
    //ads
    ads = await Post.find({},{title:1,img:1,category:1,updatedAt:1},{limit:4});
    //post banner without category
    banners = await Post.find({},{title:1,img:1,category:1,updatedAt:1},{limit:1});

    const renamedPosts = posts.map(post=>{
        const {userId, commented, ...rest} = post.toObject();
        return {
            ...rest,
            commentCount:commented.length,
            user:userId
        }
    })

    //response
    response = new apiresponse("all posts",200,{posts:renamedPosts,ads,banners});
    return res.status(response.statusCode).json(response)
})


//get post details function
const getPost = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //if id exists 
    if(!postId){
        response = new apiError(400,"Invalid Post Id");
        return res.status(response.statusCode).json(response)
    }

    //post info retrive
    const postInfo = await Post.findOne({_id:postId}).populate('userId',"name username img").then(result=>{
        return {
            success: true,
            result
        }
    }).catch(err=>{
        return {
            success:false,
            err
        }
    });

    //if post doesn't exists
    if(!postInfo.success){
        response = new notFoundError({value:postId,name:"Post not found!"});
        return res.status(response.statusCode).json(response)
    }

    //same type post
    const suggestionpost = await Post.find({category:postInfo.result.category},{_id:1,title:1,img:1,category:1},{limit:4}).populate('userId','username');

    //rename post
    const {userId, ...rest} = postInfo.result.toObject();
    
    //response post
    response = new apiresponse("Post has found",200,{
        ...rest,
        user:userId,
        suggestions:suggestionpost.map(post=>{
            const {userId, ...rest} = post.toObject();
            return {
                ...rest,
                user:userId
            }
        })
    })
    setTimeout(()=>{
        return res.status(response.statusCode).json(response);
    },1000);
});


//addpost function
const addPost = asyncHandler(async (req,res,next) =>{
    // post info 
    const post = req.body;
    var response;

    //userId 
    const token = req.cookies.uid
    const userInfo = verifyToken(token);

    if(!userInfo.success){
        return res.status(400).json(userInfo.err)
    }

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

    //response
    response = new apiresponse("Post Uploaded successfully",200)
    return res.status(response.statusCode).json(response)
})


//update post function
const updatePost = asyncHandler(async (req,res,next) =>{
    //post new info 
    const newInfo = req.body;
    var response;

    //is body empty
    if(!(newInfo.title && newInfo.description && newInfo.img)){
        response = new apiError(400,"Please fill all fields");
        return res.status(response.statusCode).json(response)
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
        return res.status(response.statusCode).json(response)
    }

    //response
    response = new apiresponse("Post updated successfully",200);
    return res.status(response.statusCode).send(`Post updated successfully`);
})


//partial update function
const partialUpdate = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //post id check
    if(!postId){
        response = new apiError(400,"Invalid posr Id");
        return res.status(response.statusCode).json(response);
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
        return res.status(response.statusCode).json(response);
    }

    //response
    response = new apiresponse(`Post's ${Object.keys(req.body).map((key,index)=>index===0?key:" "+key)} changed successfully`,200);
    return res.status(response.statusCode).json(response);   
})


//delete post function
const deletePost = asyncHandler(async (req,res,next) =>{
    const postId = req.params.id;
    var response;

    //valid Id
    if(!postId){
        response = new apiError(400,"Invalid Post Id");
        return res.status(response.statusCode).json(response)
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
        return res.status(response.statusCode).json(response)
    }

    //response
    response = new apiresponse(`(id:${postId}) is deleted successfully`,200);
    return res.status(response.statusCode).json(response)
})


//exports 
export { getPosts, getPost, addPost, partialUpdate, updatePost, deletePost }
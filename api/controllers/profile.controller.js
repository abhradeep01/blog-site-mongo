import asyncHanlder from "../utilities/asyncHandler.js";
import { verifyToken } from "../utilities/auth.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { apiresponse } from "../helper/apiResponse.js";
import { clientError } from "../helper/CustomError.js";


//function for getting own profile
const getProfileInfo = asyncHanlder(async(req,res,next)=>{
    //verify cookie
    const info = verifyToken(req.cookies.uid);
    //response
    var response;    
    //userinfo
    const user = await User.findOne(
        {
            username:info.result.username
        },
        {
            password:0,
            createdAt:0,
            updatedAt:0
        }
    );
    //user posts count
    const postcount = await Post.countDocuments(
        {
            userId:user._id
        }
    );
    //if user not found
    if(!user){
        return next(new clientError(
            "userNotFoundError",
            "user not found!",
            404
        ))
    }
    //config response
    response = new apiresponse(
        "User info send successfully",
        200,
        {
            ...user.toObject(),
            postcount,
            likedcount:user.likedPosts.length,
            bookmarkedcount:user.savedPosts.length
        }
    );
    return res.status(response.statusCode).json(response);
})


//posts function 
const getUsersPosts = asyncHanlder(async (req,res,next)=>{
    //cookie
    const userinfo = verifyToken(req.cookies.uid);
    //response
    var response;
    //users posts
    const posts = await Post.find(
        {
            userId:userinfo.result.id
        }
    ).populate(
        'userId',
        'username'
    );
    //if user posts not found
    if(posts.length===0){
        return next(new clientError(
            "postNotFound",
            "You haven't posted any Blog or Article!",
            404
        ))
    }
    //rename
    const renamed = posts.map(post=>{
        const {userId, ...rest} = post.toObject();
        return{
            ...rest,
            user:userId
        }
    });
    //response config
    response = new apiresponse(
        "users post found",
        200,
        [...renamed]
    );
    return res.status(response.statusCode).json(response)
})


//for getting bookmarked posts
const bookmarkedPosts = asyncHanlder(async(req,res,next)=>{
    //verify cookie
    const info = verifyToken(req.cookies.uid);
    //response
    var response;
    //bookmarked posts
    const {savedPosts} = await User.findOne(
        {
            username:info.result.username
        },
        {
            savedPosts:1,
            _id:0
        }
    ).populate(
        {
            path:'savedPosts',
            select:{
                upload_date:0,createdAt:0
            }
        }
    );
    //bookmarked posts not found
    if(savedPosts.length===0){
        return next(new clientError(
            "postNotFound",
            "Saved posts not found",
            404
        ))
    }
    //response cofig
    response = new apiresponse(
        "saved post found",
        200,
        [...savedPosts]
    );
    return res.status(response.statusCode).json(response);
})


//for getting liked posts
const likedPosts = asyncHanlder(async(req,res,next)=>{
    // verify token 
    const info = verifyToken(req.cookies.uid);
    //response
    var response;
    //liked posts
    const {likedPosts} = await User.findOne(
        {
            username:info.result.username
        },
        {
            likedPosts:1,
            _id:0
        }
    ).populate(
        {
            path:'likedPosts',
            select:{
                upload_date:0,
                createdAt:0
            }
        }
    );
    //liked posts not exists
    if(likedPosts.length===0){
        return next(new clientError(
            "NotFoundError",
            "You haven't liked any post",
            404
        ))
    }
    //response config
    response = new apiresponse(
        "liked post's found successfully",
        200,
        [...likedPosts]
    );
    return res.status(response.statusCode).json(response)
})


//exports
export {getProfileInfo,getUsersPosts,bookmarkedPosts,likedPosts};
import asyncHanlder from "../middleware/asyncHandler.js";
import { verifyToken } from "../services/auth.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { apiresponse } from "../utilities/apiResponse.js";
import { apiError, notFoundError } from "../utilities/CustomError.js";
import { name } from "ejs";


//function for getting own profile
const getProfileInfo = asyncHanlder(async(req,res,next)=>{
    //params username
    const username = req.params.username;
    //cookie
    const token = req.cookies.uid;
    //verify cookie
    const info = verifyToken(token);

    //cookie expired
    if(!info.success){
        response = new Error("Your session expired. Please login again");
        response.statusCode = 401;
        response.name = "SessionExpiredError";
        return next(response)
    }
    //response
    var response;

    // confirm user
    if(username===info.result.username){
        //userinfo
        const user = await User.findOne({username:username},{
            password:0,createdAt:0,updatedAt:0
        });
        //user posts count
        const postcount = await Post.countDocuments({userId:user._id});

        //if user not found
        if(!user){
            response = new apiError(
                {
                    message:`User ${username} not found!`,
                    name:"UserNotExistsError"
                },404
            );
            return res.status(response.statusCode).json(response)
        }
        
        //config response
        response = new apiresponse("User info send successfully",200,{
            ...user.toObject(),
            postcount,
            likedcount:user.likedPosts.length,
            bookmarkedcount:user.savedPosts.length
        });
        return res.status(response.statusCode).json(response);
    }
    
    //config response
    const err = new Error(`user isn't authorized to access ${username}'s personal info!`);
    err.statusCode = 403;
    err.name = 'access denied!';
    return next(err)
})


//posts function 
const getUsersPosts = asyncHanlder(async (req,res,next)=>{
    const username = req.params.username;
    //cookie
    const userinfo = verifyToken(req.cookies.uid);
    //response
    var response;

    // user matches
    if(username===userinfo.result.username){
        //users posts
        const posts = await Post.find({userId:userinfo.result.id}).populate('userId','username');

        //if user posts not found
        if(posts.length===0){
            response = new apiError(
                {
                    message:"You haven't posted any Blog or Article!",
                    name:"NotFound"
                },404
            );
            return res.status(response.statusCode).json(response)
        }

        const renamed = posts.map(post=>{
            const {userId, ...rest} = post.toObject();
            return{
                ...rest,
                user:userId
            }
        });

        //response config
        response = new apiresponse("users post found",200,[...renamed]);
        return res.status(response.statusCode).json(response)
    }

    //error config
    response = new Error(`You have no rights to access ${username}'s posts!`);
    response.statusCode = 403;
    response.name = 'forbidden';
    return next(response)
})


//for getting bookmarked posts
const bookmarkedPosts = asyncHanlder(async(req,res,next)=>{
    // params username
    const username = req.params.username;
    //verify cookie
    const info = verifyToken(req.cookies.uid);
    //response
    var response;

    //check user confirm
    if(username===info.result.username){
        //bookmarked posts
        const {savedPosts} = await User.findOne({username},{savedPosts:1,_id:0}).populate({path:'savedPosts',select:{upload_date:0,createdAt:0}});

        //bookmarked posts not found
        if(savedPosts.length===0){
            response = new notFoundError({name:"Not Found!",message:"Saved posts not found!"});
            return res.status(response.statusCode).json(response)
        }
            
        //response cofig
        response = new apiresponse("saved post found",200,[...savedPosts]);
        return res.status(response.statusCode).json(response);
    }

    //response
    const err = new Error(`You can't access ${username}'s bookmarked posts!`);
    err.statusCode = 403;
    err.name = 'access denied!';
    return next(err)
})


//for getting liked posts
const likedPosts = asyncHanlder(async(req,res,next)=>{
    //username
    const username = req.params.username;
    //token
    const token = req.cookies.uid;
    // verify token 
    const info = verifyToken(token);
    //response
    var response;

    //verify user request using token
    if(username===info.result.username){
        //liked posts
        const {likedPosts} = await User.findOne({username},{likedPosts:1,_id:0}).populate({path:'likedPosts',select:{upload_date:0,createdAt:0}});

        //liked posts not exists
        if(likedPosts.length===0){
            response = new notFoundError({message:"You haven't liked any post!",name:"Not Found!"});
            return res.status(response.statusCode).json(response)
        }

        //response config
        response = new apiresponse("liked post's found successfully",200,[...likedPosts]);
        return res.status(response.statusCode).json(response)
    }

    //config response
    const err = new Error(`You can't access ${username}'s liked posts!`);
    err.statusCode = 403;
    err.name = "access denied!";
    return next(err)
})


//exports
export {getProfileInfo,getUsersPosts,bookmarkedPosts,likedPosts};
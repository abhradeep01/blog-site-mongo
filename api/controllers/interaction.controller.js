import asyncHanlder from "../utilities/asyncHandler.js";
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import { verifyToken } from "../utilities/auth.js";
import { actionError } from "../helper/CustomError.js";
import { apiresponse } from "../helper/apiResponse.js";

//post liked function
const liked = asyncHanlder(async (req,res,next) =>{
    //postId
    const postId = req.params.id;
    //response
    var response;
    //user
    const userInfo = verifyToken(req.cookies.uid);
    //user id
    const userId = userInfo.result.id;
    //user
    const user = await User.findOne(
        {
            _id:userId
        },
        {
            likedPosts:1
        }
    );
    //post
    const post = await Post.findOne(
        {
            _id:postId
        },
        {
            liked:1
        }
    );
    //if user not liked post
    if(!post.liked.includes(userId) && !user.likedPosts.includes(postId)){
        //userid add to post
        post.liked.push(userInfo.result.id);
        await post.save();
        //postid add to user
        user.likedPosts.push(postId);
        await user.save();

        //response config
        response = new apiresponse(
            "post liked successfully",
            200
        );
        return res.status(response.statusCode).json(response)
    }
    //response
    return next(new actionError(
        "can't - post like already!",
        "invalidActionError",
        "like"
    ))
})


//post unliked function
const unliked = asyncHanlder(async (req,res,next) =>{
    //postId
    const postId = req.params.id;
    //response
    var response;
    //verify cookies
    const userInfo = verifyToken(req.cookies.uid);
    //userid
    const userId = userInfo.result.id;
    //user
    const user = await User.findOne(
        {
            _id:userId
        },
        {
            likedPosts:1
        }
    );
    //post 
    const post = await Post.findOne(
        {
            _id:postId
        },
        {
            liked:1
        }
    );

    //if user liked already
    if(user.likedPosts.includes(postId) && post.liked.includes(userId)){
        //removing post from user
        user.likedPosts.pop(postId)
        await user.save();
        //removing user from post
        post.liked.pop(userId);
        await post.save();
        //response config
        response = new apiresponse(
            `post unliked by ${userInfo.result.username}`,
            200
        );
        return res.status(response.statusCode).json(response)
    }
    //response
    return next(new actionError(
        "can't unliked - post currently not liked",
        "invalidActionError",
        "unliked"
    ))
})


//post bookmarked function
const saved = asyncHanlder(async (req,res,next) =>{
    //postid
    const postId = req.params.id;
    //cookies
    const token = req.cookies.uid;
    //response
    var response;
    //verify cookies 
    const userInfo = verifyToken(token);
    //user id
    const userId = userInfo.result.id;
    //user
    const user = await User.findOne(
        {
            _id:userId
        },
        {
            savedPosts:1
        }
    );
    //post 
    const post = await Post.findOne(
        {
            _id:postId
        },
        {
            bookmarked:1
        }
    );

    //if post not saved by this user
    if(!user.savedPosts.includes(postId) && !post.bookmarked.includes(userId)){
        //post saved to user
        user.savedPosts.push(postId);
        await user.save();
        //user saved to post
        post.bookmarked.push(userId);
        await post.save();

        //response config
        response = new apiresponse(
            `posts saved successfully by ${userInfo.result.username}`,
            200
        );
        return res.status(response.statusCode).json(response)
    }
    //error durring saved
    response = new actionError(
        "can't saved - post currently already saved",
        "InvalidActionError",
        "saved"
    );
    return res.status(response.statusCode).json(response)
})


//post unbookmarked function
const unsaved = asyncHanlder(async (req,res,next) =>{
    //post id
    const postId = req.params.id;
    //token 
    const token = req.cookies.uid;
    //response
    var response;
    //verify cookies
    const userInfo = verifyToken(token);
    //user id
    const userId = userInfo.result.id;
    //user
    const user = await User.findOne(
        {
            _id:userId
        },
        {
            savedPosts:1
        }
    );
    //post
    const post = await Post.findOne(
        {
            _id:postId
        },
        {
            bookmarked:1
        }
    );
    //if post is saved by this user
    if(user.savedPosts.includes(postId) && post.bookmarked.includes(userId)){
        //post removed from user
        user.savedPosts.pop(postId);
        await user.save();
        //user removed from post
        post.bookmarked.pop(userId);
        await post.save()

        //response config
        response = new apiresponse(
            `post removed from bookmarked successfully by ${userInfo.result.username}`,
            200
        );
        return res.status(response.statusCode).json(response)
    }
    //error during removing from bookmarked
    return next(new actionError(
        "can't unbookmarked - post currently unbookmarked already",
        "InvalidActionError",
        "unsaved"
    ))
})


// export
export { liked, unliked, saved, unsaved }
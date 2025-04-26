import asyncHanlder from "../utilities/asyncHandler.js";
import { verifyToken } from "../utilities/auth.js";
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import User from '../models/user.model.js';
import { apiresponse } from "../helper/apiResponse.js";
import { apiError } from "../helper/CustomError.js";
import { name } from "ejs";


//posts all comments
const getPostsAllComments = asyncHanlder(async (req,res,next)=>{
    //post id
    const postId = req.params.id;
    //cookies
    const token = req.cookies.uid;
    //response
    var response;

    //cookies 
    const userInfo = verifyToken(token);
    //cookies expired
    if(!userInfo.success){
        response = new Error("Your session expired. Please log in again.");
        response.statusCode = 401;
        response.name = "SessionExpiredError";
        return next(err)
    }

    //user id
    const userId = userInfo.result.id;
    //post does exsits
    const user = await User.findOne(
        {
            _id:userId
        },
        '0'
    );
    //user does not exists
    if(!user){
        response = new Error("The requested user does not exists!");
        response.statusCode = 404;
        response.name = "UserNotFoundError";
        return next(response)
    }
    //post
    const post = await Post.findOne(
        {
            _id:postId
        },
        '0'
    );
    //post does not exists
    if(!post){
        response = new Error("The requested post does not exists!");
        response.statusCode = 404;
        response.name = "PostNotFoundError";
        return next(response)
    }
    //comments
    const postComments = await Comment.find(
        {
            post:postId
        }
    );
    //no comments found
    if(postComments.length===0){
        response = new Error("No Comments found yet!");
        response.name = "CommentsNotFoundError";
        response.statusCode = 404;
        return next(response)
    }

    //response config
    response = new apiresponse(
        "Posts commets found successfully",
        200,
        [...postComments]
    );
    return res.status(response.statusCode).json(response)
});


//add comment
const addComment = asyncHanlder(async(req,res,next)=>{
    //post id
    const postId = req.params.id
    // body
    const { commentText } = req.body;
    //response
    var response;

    //cookies decode
    const userInfo = verifyToken(req.cookies.uid);
    //cookies expired
    if(!userInfo.success){
        response = new Error("Your session expired. Please log in again.");
        response.statusCode = 401;
        response.name = "SessionExpiredError";
        return next(response)
    }

    //user id
    const userId = userInfo.result.id;
    //user
    const user = await User.findOne(
        {
            _id:userId
        },
        "0"
    );
    //if user not exists 
    if(!user){
        response = new Error("the requested user does not exists!");
        response.statusCode = 404;
        response.name = "UserNotFoundError";
        return next(response)
    }
    //post
    const post = await Post.findOne(
        {
            _id:postId
        },
        {
            commented:1
        }
    );
    //post does not exists
    if(!post){
        response = new Error("The post you're trying to comment on doesn't exist");
        response.statusCode = 404;
        response.name = "CommentTargetNotFoundError";
        return next(response)
    }

    //create comment
    const newComment = await Comment.create({
        user: userId,
        post: postId,
        description:commentText
    }).then((result)=>{
        return {
            success: true,
            result
        }
    }).catch(err=>{
        return{
            success:false,
            err
        }
    });
    //new comment not created
    if(!newComment.success){
        response = new Error(newComment.err.message);
        response.statusCode = 500;
        response.name = "CommentPersistError";
        return next(response)
    }

    //user id add to post
    post.commented.push(userId);
    await post.save().then(result=>{
        if(result){
            response = new apiresponse(
                "Commented to post successfully",
                201,
                {
                    ...newComment.result.toObject()
                }
            );
            return res.status(response.statusCode).json(response)
        }
    }).catch(err=>{
        if(err){
            response = new Error(err.message);
            response.statusCode = 500 ;
            response.name = "CommentSavedError";
            return next(response)
        }
    })
})


//edit comment
const editComment = asyncHanlder(async(req,res,next)=>{
    //body
    const { newtext } = req.body;
    //comment id
    const commentId = req.params.id;
    //response
    var response;
    //cookies 
    const userInfo = verifyToken(req.cookies.uid);

    //if cookies not valid
    if(!userInfo.success){
        response = new Error("Your session expired. Please login again");
        response.statusCode = 401; 
        response.name = "SessionExpiredError";
        return next(response)
    }
    //user
    const user = await User.findOne(
        {
            _id:userInfo.result.id
        },
        "0"
    ).then(result=>{
        return{
            success:true,
            result
        }
    }).catch(err=>{
        return{
            success:false,
            err
        }
    });
    //if user does not exists
    if(!user){
        response = new Error("the requested user does not exists!");
        response.statusCode = 404;
        response.name = "ErrorNotFoundError!";
        return next(response)
    }
    // comment
    const comment = await Comment.findOne(
        {
            _id:commentId
        }
    );
    // if comment not exists
    if(!comment){
        response = new Error("requested comment not found!");
        response.statusCode = 404;
        response.name = "CommentNotFoundError";
        return next(response)
    }
    //permissons
    if(comment.user.toString()!==userInfo.result.id){
        response = new apiError(
            {
                message:"You don't have permissons to edit this comment",
                name:"UnauthorizedUserModificationError"
            },403
        );
        return res.status(response.statusCode).json(response)
    }
    //post update
    await Comment.updateOne(
        {
            _id:commentId
        },
        {
            $set:{
                description:newtext
            }
        }
    ).then(async result=>{
        if(result){
            const newComment = await Comment.findOne(
                {
                    _id:commentId
                }
            );
            response = new apiresponse(
                "Comment update successfully",
                202,
                {
                    ...newComment.toObject()
                }
            );
            return res.status(response.statusCode).json(response)
        }
    }).catch(err=>{
        if(err){
            response = new Error("Unable to update comment!");
            response.statusCode = 500;
            response.name = "CommentUpdateError";
            return next(response)
        }
    });
})


//delete comment
const deleteComment = asyncHanlder(async(req,res,next)=>{
    //comment id
    const commentId = req.params.id;
    //cookies decoded
    const userInfo = verifyToken(req.cookies.uid);
    //response
    var response;

    //user
    const user = await User.findOne(
        {
            _id:userInfo.result.id
        }
    );
    //if user not exists
    if(!user){
        response = new Error("the requested user does no exists!");
        response.statusCode = 404;
        response.name = "UserNotFoundError";
        return next(response)
    }
    //comment
    const comment = await Comment.findOne(
        {
            _id:commentId
        }
    );
    //if comment not found
    if(!comment){
        response = new Error("This requested comment for deletion does not exists!");
        response.statusCode = 404;
        response.name = "CommentNotFoundError";
        return next(response)
    }
    //permissons
    if(comment.user.toString()!==userInfo.result.id){
        response = new apiError(
            {
                message:"You don't have permisson to delete this comment",
                name:"UnauthorizedUserModificationError"
            },403
        );
        return res.status(response.statusCode).json(response)
    }
    //delete comment
    await Comment.deleteOne(
        {
            _id:commentId
        }
    ).then(result=>{
        if(result){
            response = new apiresponse("Your comment deleted successfully",202);
            return res.status(response.statusCode).json(response)
        }
    }).catch(err=>{
        if(err){
            response = new Error("Unable to delete the comment!");
            response.statusCode = 500;
            response.name = "CommentDeleteConflict";
            return next(response)
        }
    });
})


// export
export { getPostsAllComments, addComment, editComment, deleteComment }
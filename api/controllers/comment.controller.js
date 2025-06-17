import asyncHanlder from "../utilities/asyncHandler.js";
import { verifyToken } from "../utilities/auth.js";
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import User from '../models/user.model.js';
import { apiresponse } from "../helper/apiResponse.js";
import { clientError, serverError } from "../helper/CustomError.js";


//posts all comments
const getPostsAllComments = asyncHanlder(async (req,res,next)=>{
    //post id
    const postId = req.params.id;
    //cookies
    const token = req.cookies.uid;
    //response
    var response;
    //cookies decoded
    const userInfo = verifyToken(token);
    //user id
    const userId = userInfo.result.id;
    //post does exsits
    const user = await User.findOne(
        {
            _id:userId
        }
    );
    //user does not exists
    if(!user){
        return next(new clientError(
            "userDoesNotExistsError",
            "The requested user does not exists!",
            404
        ))
    }
    //post
    await Post.findOne(
        {
            _id:postId
        }
    ).then(async result=>{
        //comments
        const postComments = await Comment.find(
            {
                post:result._id
            }
        );
        //no comments found
        if(postComments.length===0){
            return next(new clientError(
                "commentsNotFoundError",
                "no comments found yet!",
                404
            ))
        }
        //response config
        response = new apiresponse(
            "Posts commets found successfully",
            200,
            [...postComments]
        );
        return res.status(response.statusCode).json(response)
    }).then(err=>{
        // server error
        if(err){
            return next(new clientError(
                "postNotFoundError",
                err,
                500
            ))
        }
        // client error
        return next(new clientError(
            "postNotFoundError",
            "the requested post does not exists!",
            404
        ))
    });
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
        return next(new clientError(
            "userDoesNotExistsError",
            "the requested user does not exists!",
            404
        ))
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
        return next(new clientError(
            "postNotFoundError",
            "The post you're trying to comment doesn't exists!",
            404
        ))
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
        return next(new serverError(
            "unableToComment",
            newComment.err.message,
            500
        ))
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
        // server error
        if(err){
            return next(new clientError(
                "commentSavedError",
                err.message,
                500
            ))
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
    //user
    const user = await User.findOne(
        {
            _id:userInfo.result.id
        }
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
        return next(new clientError(
            "userNotFoundError",
            "the requested user does not exists!",
            404
        ))
    }
    // comment
    const comment = await Comment.findOne(
        {
            _id:commentId
        }
    );
    // if comment not exists
    if(!comment){
        return next(new clientError(
            "commentsNotFoundError",
            "requested comment not found!",
            404
        ))
    }
    //permissons
    if(comment.user.toString()!==userInfo.result.id){
        return next(new clientError(
            "unauthorizedUserModificationError",
            "you don't have permisson to edit this comment!",
            403
        ))
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
        if(result.acknowledged){
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
        // server error
        if(err){
            return next(new serverError(
                'commentUpdateError',
                "unable to update comment!",
                403
            ))
        }
        // client error
        response = new clientError(
            "commentUpdateError",
            "Unable to update comment!"
        );
        return res.status(response.statusCode).json(response)
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
        response = new clientError(
            "userNotFoundError",
            "the requested user does not exists!",
            404
        )
        return res.status(response.statusCode).json(response)
    }
    //comment
    const comment = await Comment.findOne(
        {
            _id:commentId
        }
    );
    //if comment not found
    if(!comment){
        response = new clientError(
            "commentNotFoundError",
            "The requested comment for deletion does not exists!",
            404
        );
        return res.status(response.statusCode).json(response)
    }
    //permissons
    if(comment.user.toString()!==userInfo.result.id){
        return next(new clientError(
            "unauthorizedUserModificationError",
            "you don't have permisson to delete this comment!",
            403
        ))
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
        // server error
        if(err){
            return next(new serverError(
                "commentDeleteConflict",
                err,
                500
            ))
        }
        // client error
        return next(new clientError(
            "commentDeleteConflict",
            "Unable to delete comment!"
        ))
    });
})


// export
export { getPostsAllComments, addComment, editComment, deleteComment }
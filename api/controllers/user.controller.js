import asyncHanlder from "../utilities/asyncHandler.js"
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { verifyToken } from "../utilities/auth.js";
import { apiError, notFoundError } from "../helper/CustomError.js";
import { apiresponse } from "../helper/apiResponse.js";


//userinfo 
const userInfo = asyncHanlder(async (req,res,next) =>{
    //user id
    const userid = req.params.id;
    //response
    var response;

    //uservalid
    await User.findById(
        {
            _id:userid
        },
        {
            likedPosts:0,
            savedPosts:0
        }
    ).then(async (result)=>{
        const postcount = await Post.countDocuments(
            {
                userId:userid
            }
        );
        response = new apiresponse(
            "user found successfully",
            200,
            {
                ...result.toObject(),
                postcount
            }
        );
        return res.status(response.statusCode).send(response)
    }).catch(err=>{
        if(err){
            response = new Error(`the requested user_id:('${userid}') user not exists!`);
            response.statusCode = 404;
            response.name = 'UserNotFoundError';
            return next(response)
        }
    });

});


//bookmarked post by user
const getUserPosts = asyncHanlder(async (req,res,next) =>{
    const userId = req.params.id;
    //response
    var response;

    //user
    const user = await User.findById(
        {
            _id:userId
        }
    ).then(result=>{
        return {
            success:true,
            result
        }
    }).catch(err=>{
        return {
            success:false,
            err
        }
    });
    //if user is not found
    if(!user.success){
        const err = new Error(`userId ('${userId}') not found!`);
        err.statusCode = 404;
        err.name = user.err.name;
        return next(err)
    }
    //posts
    await Post.find(
        {
            userId:userId
        }
    ).then(result=>{
        response = new apiresponse(
            `user posts fetched successfully`,
            200,
            [...result]
        );
        return res.status(response.statusCode).send(response)
    }).catch(err=>{
        if(err){
            response = new notFoundError(
                {
                    name:"No Content",
                    message:"user hasn't posted anything yet!"
                }
            );
            return res.status(response.statusCode).json(response)
        }
    });
})


//user info update
const userPartialUpdate = asyncHanlder(async (req,res,next) =>{
    //userid
    const userid = req.params.id;
    //new info
    const newInfo = req.body;
    //response
    var response;
    
    //cookies decoded
    const userInfo = verifyToken(req.cookies.uid);
    //cookies expired
    if(!userInfo.success){
        response = new Error("Your session expired. Please log in again.");
        response.statusCode = 401;
        response.name = "SessionExpiredError";
        return next(err)
    }
    //user access denied
    if(userid!=userInfo.result.id){
        response = new apiError(
            {
                message:"You don't have permisson to modify this user's informtion",
                name:"UnauthorizedUserModificationError"
            },403
        );
        return res.status(response.statusCode).json(response)
    }
    //user
    const user = await User.findOne(
        {
            _id:userid
        }
    );
    //user not exists
    if(!user){
        response = new Error("User not found!");
        response.statusCode = 404;
        response.name = "UserNotFoundError";
        return next(response)
    }
    //update info 
    const updateInfo = await Promise.all(
        Object.keys(newInfo).map(async(key)=>{
            return await User.updateOne(
                {
                    _id:userid
                },
                {
                    $set:{
                        [key]:newInfo[key]
                    }
                }).then(result=>{
                    return result.acknowledged
                }).catch(err=>{
                    if(err){
                        return false
                    }
                })
            }
        )
    );
    //if not updated
    if(updateInfo.includes(false)){
        response = new Error(`userInfo is not updated due to Temporary server issue. Please try later`);
        response.name = "UpdateFailedError" ;
        response.statusCode = 400;
        return next(response)
    }

    // response after done updating
    response = new apiresponse(
        `${Object.keys(newInfo).map(key => key+" ")}updated successfully`,
        202
    );
    return res.status(response.statusCode).json(response)
})


//delete user
const deleteUser = asyncHanlder(async (req,res,next) =>{
    //user id
    const userId = req.params.id;
    // response
    var response;

    //cookies decoded
    const userInfo = verifyToken(req.cookies.uid);
    //user had no permit to edit
    if(userId!=userInfo.result.id){
        response = new apiError(
            {
                message:"You don't have permisson to delete this user",
                name:"UnauthorizedUserModificationError"
            },403
        );
        return res.status(response.statusCode).json(response)
    }
    //user 
    const user = await User.findOne(
        {
            _id:userId
        }
    );
    //user not exists
    if(!user){
        response = new Error("The requested user account not found due to Internal server error!");
        response.statusCode = 500;
        response.name = "InternalServerError";
        return next(response)
    }
    //user delete
    await User.deleteOne(
        {
            _id:userId
        }
    ).then(result=>{
        response = new apiresponse(
            "User deleted Successfully",
            200
        );
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        if(err){
            response = new Error("Unable to delete your account due to Internal server error during deletion!");
            response.statusCode = 500;
            response.name = "UserDeleteFailedError";
            return next(response)
        }
    });
})


//export
export { userInfo, getUserPosts, userPartialUpdate, deleteUser}
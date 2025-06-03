import asyncHanlder from "../utilities/asyncHandler.js"
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { verifyToken } from "../utilities/auth.js";
import { apiError, clientError, notFoundError, serverError } from "../helper/CustomError.js";
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
        // server error
        if(err){
            return next(new serverError(
                "UserNotFoundError",
                err
            ))
        }
        // client error
        return next(new clientError(
            "UserNotFoundError",
            "the requested user is not found!",
            404
        ))
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
        return next(new clientError(
            user.err.name,
            `userId ('${userId}') not found!`,
            404
        ))
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
        // server error
        if(err){
            return next(new serverError(
                "No Content",
                err
            ))
        }
        // client error
        return next(new clientError(
            "NoContentFound",
            "no content found!",
            404
        ))
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
    //user access denied
    if(userid!=userInfo.result.id){
        return next(new clientError(
            "UnauthorizedUserModificationError",
            "You don't have permisson to modify this user's information!",
            403
        ))
    }
    //user
    const user = await User.findOne(
        {
            _id:userid
        }
    );
    //user not exists
    if(!user){
        return next(new clientError(
            "UserNotFoundError",
            "User not found!",
            404
        ))
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
        return next(new serverError(
            `UpdateFailedError`,
            `userinfo not updated due to temporary server issues. please try later!`,
            503
        ))
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
        return next(new clientError(
            "UnauthorizedUserModificationError",
            "You don't have permisson to delete user!",
            403
        ))
    }
    //user 
    const user = await User.findOne(
        {
            _id:userId
        }
    );
    //user not exists
    if(!user){
        return next(new serverError(
            "InternalServerError",
            "The requested user account not found due to Internal server error!"
        ))
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
            return next(new serverError(
                "UserDeleteFailedError",
                "Unable to delete your account due to internal server error during deletion!"
            ))
        }
    });
})


//export
export { userInfo, getUserPosts, userPartialUpdate, deleteUser}
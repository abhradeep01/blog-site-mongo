import asyncHanlder from "../middleware/asyncHandler.js"
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { apiError, notFoundError } from "../utilities/CustomError.js";
import { apiresponse } from "../utilities/apiResponse.js";


//userinfo 
const userInfo = asyncHanlder(async (req,res,next) =>{
    const userid = req.params.id;
    var response;

    //uservalid
    const userInfo = await User.findById({_id:userid},{likedPosts:0,savedPosts:0}).then(result=>{
        return {
            success:true,
            result
        }
    }).catch(err=>{
        return{
            success:false,
            err
        }
    });

    //user not found
    if(!userInfo.success){
        const err = new Error(`userId ('${userid}') not found!`);
        err.statusCode = 404;
        err.name = 'not found!';
        return next(err)
    }

    //post count
    const postcount = await Post.countDocuments({userId:userid});
    
    // user info response
    response = new apiresponse("user found successfully",200,{...userInfo.result.toObject(),postcount});
    return res.status(response.statusCode).send(response)
})


//bookmarked post by user
const getUserPosts = asyncHanlder(async (req,res,next) =>{
    const userId = req.params.id;
    //response
    var response;

    //user
    const user = await User.findById({_id:userId}).then(result=>{
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
    const posts = await Post.find({userId:userId});
    
    // if no post found
    if(posts.length===0){
        console.log(posts);
        response = new notFoundError({name:"No Content",message:"user hasn't posted anything yet!"});
        return res.status(notFoundError.statusCode).json(response)
    }

    //response
    response = new apiresponse(`user posts fetched successfully`,200,[...posts]);
    return res.status(response.statusCode).send(response)
})


//user info update
const userPartialUpdate = asyncHanlder(async (req,res,next) =>{
    const userid = req.params.id;
    const newInfo = req.body;
    var response;

    //is required
    if(!newInfo[Object.keys(newInfo)[0]]){
        response = new apiError("this field is required!",400);
        return res.status(response.statusCode).json(response)
    }

    //update info 
    const updateInfo = await Promise.all(
        Object.keys(newInfo).map(async(key)=>{
            return await User.updateOne({_id:userid},{$set:{[key]:newInfo[key]}}).then(result=>{
                return result.acknowledged
            }).catch(err=>{
                if(err){
                    return false
                }
            })
        })
    )

    //if not updated
    if(false===updateInfo[0]){
        response = new apiError(`${Object.keys(newInfo)[0]} is not updated`,400);
        return res.status(response.statusCode).json(response)
    }

    // response after done updating
    response = new apiresponse(`${Object.keys(newInfo)[0]} updated successfully`,200);
    return res.status(response.statusCode).json(response)
})


//delete user
const deleteUser = asyncHanlder(async (req,res) =>{
    res.send(`${req.params.username} is deleted`)
})


//export
export { userInfo, getUserPosts, userPartialUpdate, deleteUser}
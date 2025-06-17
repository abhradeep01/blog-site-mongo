import Post from "../models/post.model.js";
import { verifyToken } from "../utilities/auth.js";
import User from '../models/user.model.js';
import asyncHandler from "../utilities/asyncHandler.js";
import { apiresponse } from "../helper/apiResponse.js";
import { clientError, serverError } from "../helper/CustomError.js";


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
    if(!type){
        //if all posts
        posts = await Post.find(
            {},{},
            {
                limit:4
            }
        ).populate(
            'userId',
            'username'
        );
        //ads
        ads = await Post.find(
            {},
            {
                title:1,
                img:1,
                category:1,
                updatedAt:1
            },
            {
                limit:4
            }
        );
        //post banner without category
        banners = await Post.find(
            {},
            {
                title:1,
                img:1,
                category:1,
                updatedAt:1
            },
            {
                limit:1
            }
        );
        //rename userid to user
        const renamedPosts = posts.map(post=>{
            const {userId, commented, ...rest} = post.toObject();
            return {
                ...rest,
                commentCount:commented.length,
                user:userId
            }
        })
        //response
        response = new apiresponse(
            "all posts",
            200,
            {
                posts:renamedPosts,
                ads,
                banners
            }
        );
        return res.status(response.statusCode).json(response)   
    }
    // posts with specified category
    posts = await Post.find(
        {
            category:type
        },
        {
            bookmarked:0
        },
        {
            limit:4
        }
    ).populate(
        {
            path:'userId',
            select:{
                username:1
            }
        }
    );
    //post ads with specified category
    ads = await Post.find(
        {
            category:type
        },
        {
            title:1,
            img:1,
            category:1,
            updatedAt:1
        },
        {
            limit:4
        }
    );
    //post banner with specified category
    banners = await Post.find(
        {
            category:type
        },
        {
            title:1,
            img:1,
            category:1,
            updatedAt:1
        },
        {
            limit:1
        }
    );
    //posts not found 
    if(posts.length===0){
        return next(new clientError(
            "categoryError",
            `('${type}') type posts are not found!`
        ))
    }
    //rename userId field
    const renamePosts = posts.map(post=>{
        const {userId, commented, ...rest} = post.toObject();
        return {
            ...rest,
            commentCount:commented.length,
            user:userId
        }
    })
    //response
    response = new apiresponse(
        `${type} type posts`,
        200,
        {
            posts:renamePosts, 
            ads, 
            banners
        }
    );
    return res.status(response.statusCode).json(response)
})


//get post details function
const getPost = asyncHandler(async (req,res,next) =>{
    //post id
    const postId = req.params.id;
    //response
    var response;
    //cookies 
    const userInfo = verifyToken(req.cookies.uid);
    //post
    const post = await Post.findOne(
        {
            _id:postId
        }
    ).populate(
        "userId",
        "username img name"
    );
    if(!post){
        return next(new clientError(
            'postNotFoundError',
            "Post not found may be deleted!",
            404
        ))
    }
    if(!post.visits.includes(userInfo.result.id)){
        post.visits.push(userInfo.result.id)
        await post.save();
    }
    //suggest posts
    const suggestPosts = await Post.find(
        {
            category:post.category
        },
        {
            title:1,
            userId:1,
            img:1,
            category:1
        },
        {
            limit:2
        }
    ).populate(
        "userId",
        "username"
    );
    //rename post
    const {userId, ...rest} = post.toObject();
    //response config
    response = new apiresponse(
        "Post found successfully",
        200,
        {
            ...rest,
            user:userId,
            suggestions:suggestPosts.map(ele=>{
                const {userId, ...rest} = ele.toObject()
                return {
                    ...rest,
                    user:userId 
                }
            })
    });
    return res.status(response.statusCode).json(response)
});


//addpost function
const addPost = asyncHandler(async (req,res,next) =>{
    // post info 
    const { title, description, img, category } = req.body;
    var response;
    // if anything is missing 
    if(!title || !description || !img || !category ){
        return next(new clientError(
            "validationError",
            "fill all the required fields!"
        ))
    }
    //userId 
    const userInfo = verifyToken(req.cookies.uid);
    //userdata
    const user = await User.findOne(
        {
            username:userInfo.result.username
        }
    );
    //user exists
    if(!user){
        return next(new clientError(
            "userNotFoundError",
            "Requested user does not exists!",
            404
        ))
    }
    // post upload
    await Post.create({
        userId:user._id,
        title: title,
        description: description,
        img: img,
        category: category,
        upload_date: Date.now()
    }).then(result=>{
        if(result){
            response = new apiresponse(
                "Post Uploaded successfully",
                200
            )
            return res.status(response.statusCode).json(response)
        }
    }).catch(err=>{
        // server error
        if(err){
            return next(new clientError(
                "serviceUnavailableError",
                "error on creating new post posting service unavailable!"
            ))
        }
        // client error
        return next(new serverError(
            "serviceUnavailableError",
            "Something went wrong!"
        ))
    })
})


//partial update function
const partialUpdate = asyncHandler(async (req,res,next) =>{
    //post id
    const postId = req.params.id;
    //response
    var response;
    //cookies decoded
    const userInfo = verifyToken(req.cookies.uid);
    //post
    const post = await Post.findOne({_id:postId});
    //if post not found
    if(!post){
        return next(new clientError(
            "postNotFoundError",
            "the requested post for updating is not exists!",
            404
        ))
    }
    //permisson
    if(post.userId._id.toString()!==userInfo.result.id){
        return next(new clientError(
            "unauthorizedUserModificationError",
            "you don't have permission to modify this post!",
            403
        ))
    }
    //update post 
    const updateResult = await Promise.all(
        Object.keys(req.body).map(async (key)=>{
            return await Post.updateOne(
                {
                    $and:[
                        {_id:postId},
                        {userId:userInfo.result.id}
                    ]
                },
                {
                    $set:{[key]:req.body[key]}
                }
            ).then(result=>{
                return result.acknowledged
            }).catch(err=>{
                // server error
                if(err){
                    return false
                }
            });
        })
    );
    //post update or not
    if(updateResult.includes(false)){
        return next(new serverError(
            "postUpdateFailedError",
            "post hasn't updated!"
        ))
    }

    //response
    response = new apiresponse(
        `Post's ${Object.keys(req.body).map((key,index)=>index===0?key:" "+key)} changed successfully`,
        202
    );
    return res.status(response.statusCode).json(response);   
})


//delete post function
const deletePost = asyncHandler(async (req,res,next) =>{
    //post id
    const postId = req.params.id;
    // response
    var response;
    //cookies decoded
    const userInfo = verifyToken(req.cookies.uid);
    //post
    const post = await Post.findOne(
        {
            _id:postId
        }
    );
    //post not exists
    if(!post){
        return next(new clientError(
            "postNotFoundError",
            "this post not found may be deleted!",
            404
        ))
    }
    //permissons
    if(post.userId._id.toString()!==userInfo.result.id){
        return next(new clientError(
            "unauthorizedUserModificationError",
            "You don't have permission to delete this post!",
            403
        ))
    }
    //delete post
    await Post.deleteOne(
        {
            _id:postId
        }
    ).then(result=>{
        //response
        response = new apiresponse(
            `(id:${postId}) is deleted successfully`,
            200,
            result.acknowledged
        );
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        // server error
        if(err){
            return next(new serverError(
                "postDeleteFailedError",
                "The request for post delete request failed!",
                503
            ))
        }
        // client error
        return next(new clientError(
            "postDeleteFailedError",
            "The request for post delete request failed!",
            404
        ))
    });
});


//exports 
export { getPosts, getPost, addPost, partialUpdate, deletePost }
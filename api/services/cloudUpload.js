import cloudinary from "../config/cloudinary.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import { apiresponse } from "../helper/apiResponse.js";


//image upload of user
const userImgUpload = asyncHanlder(async (req,res,next) =>{
    await cloudinary.uploader.upload(req.body.imgurl,{
        resource_type:'image',
        public_id: 'img',
        overwrite:true,
        folder:'blog-site-mongo/users',
        transformation:{
            width:400,
            height:400,
            aspect_ratio:'1:1'
        }
    }).then(result=>{
        var response = new apiresponse("user image uploaded successfully",201,result.secure_url);
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        if(err){
            const error = new Error("error during uploading user image to server!");
            error.statusCode = 503;
            error.name = "UploadServiceUnavailable";
            return next(error)
        }
    })
})


//user image delete
const userImgDelete = asyncHanlder(async (req,res,next) =>{
    await cloudinary.api.delete_resources(req.body.imguri,{
        type:'upload',
        resource_type:'image'
    }).then(result=>{
        var response = new apiresponse("user image deleted successfully",202);
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        if(err){
            const error = new Error("error during on deleting user image from server");
            error.statusCode = 503;
            error.name = "ServiceUnavailableError";
            return next(error)
        }
    });
})


//post image upload
const postImgUpload = asyncHanlder(async (req,res,next) =>{
    await cloudinary.uploader.upload(req.body.imguri,{
        resource_type:'image',
        public_id:'post',
        overwrite:true,
        folder:'blog-site-mongo',
        transformation:{
            width:1080,
            height:607.5,
            aspect_ratio:'16:9'
        }
    }).then(result=>{
        var response = new apiresponse("post image uploaded successfully",201,result.secure_url);
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        if(err){
            const error = new Error("error during uploading post image to server!");
            error.statusCode = 503;
            error.name = "ServiceUnavailableError";
            return next(error)
        }
    })
})


//post delete
const postDelete = asyncHanlder(async (req,res,next) =>{
    await cloudinary.api.delete_resources([req.body.imguri],{
        resource_type:'image',
        type:'upload'
    }).then(result=>{
        var response = new apiresponse("post image deleted successfully",202)
        return res.status(response.statusCode).json(response)
    }).catch(err=>{
        if(err){
            const error = new Error("error during on deleting post image from server");
            error.statusCode = 503;
            error.name = "ServiceUnavailableError";
            return next(error)
        }
    })
})

//export
export { userImgUpload, userImgDelete, postImgUpload, postDelete };
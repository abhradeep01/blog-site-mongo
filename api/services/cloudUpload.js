import cloudinary from "../config/cloudinary.js";


//image upload of user
export const userImgUpload = async (req,res) =>{
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
        res.status(200).json(result.secure_url)
    }).catch(err=>{
        res.status(400).send(err)
    })
}


//user image delete
export const userImgDelete = async (req,res) =>{
    await cloudinary.api.delete_resources(imguri,{
        type:'upload',
        resource_type:'image'
    }).then(res=>{
        console.log(res);
        return {
            success:true
        }
    }).catch(err=>{
        console.log(err);
        return {
            success:false
        }
    });
}


//post image upload
export const postImgUpload = async (req,res) =>{
    await cloudinary.uploader.upload(imguri,{
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
        return {
            url: result.secure_url,
            success:true
        }
    }).catch(err=>{
        console.log(err);
        return{
            success:false
        }
    })
}


//post delete
export const postDelete = async (req,res) =>{
    await cloudinary.api.delete_resources([imguri],{
        resource_type:'image',
        type:'upload'
    }).then(res=>{
        console.log(res);
        return {
            success:true
        }    
    }).catch(err=>{
        console.log(err);
        return {
            success:false
        }
    })
}
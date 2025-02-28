import User from "../models/user.model.js";
import { createToken } from "../services/auth.js";
import { sendVarificationCode } from "../services/nodeMail.js";
import bcrypt from 'bcryptjs';
import { otpgenerate } from "../utilities/otpgenarate.js";
import asyncHanlder from "../middleware/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiresponse } from "../utilities/apiResponse.js";

//register function
const register = asyncHanlder(async (req,res,next) =>{
    const info = req.body;
    var response;
    const user = await User.findOne({username:info.username})
    if(user){
        response = new apiError(409,"User already exists");
        return res.status(409).json(response);
    }

    //password encrypt
    const hashPassword = bcrypt.hashSync(info.password,10);
    //user created
    await User.create({
        name: info.fullname,
        username:info.username,
        email:info.email,
        password:hashPassword,
        img:info.url
    })
    
    response = new apiresponse("User created successfully",201);
    //response of user creation
    return res.status(201).json(response);
})


//login function
const login = asyncHanlder(async (req,res,next) =>{
    const userInfo = req.body;
    var response;
    if(!userInfo){
        response = new apiError(401,"fill all required fields");
        res.status(401).json(response)
    }
    const user = await User.findOne({email:userInfo.email});
    if(!user){
        response = new apiError(404,"User doesn't exists");
        return res.status(404).json(response);
    }

    //password correct
    const isCorrect = bcrypt.compareSync(userInfo.password,user.password);
    if(!isCorrect){
        response = new apiError(401,"Incorrect Password");
        return res.status(401).json(response);
    }

    //token
    var token ;
    var response;
    //short term cookie set
    response = new apiresponse(`Welcome back ${user.username}`,200,{
        otherInfo:{
            id: user._id,
            name:user.name,
            username: user.username,
            profileImg:user.img,
        }
    });
    if(!userInfo.remember){
        //token
        token = await createToken({
            username:user.username,
            password:user.password
        });

        //set cookie for short term
        return res.status(200).cookie("blog_token",token,{
            maxAge:1000 * 1,
            httpOnly:true,
            sameSite:'strict',
            secure:true
        }).json(response)
    }

    //set cookie for long term
    token = await createToken({
        username:user.username,
        password:user.password
    },true);

    //cookie setting for long term
    return res.status(200).setCookie("blog_token",token,{
        maxAge:1000 * 60 * 60 * 24 * 1 ,
        httpOnly:true,
        sameSite:'strict',
        secure:true,
        path:'/'
    }).json(response)
});


//forget password function
const forgetPassword = asyncHanlder(async (req,res,next) =>{
    const {email} = req.body;

    //check if email exists in database
    const user = await User.findOne({email:email});

    //if email is invalid
    if(!user){
        return res.status(404).json("Invalid email please insert valid email!")
    }

    //onetime password
    const otp = await otpgenerate();

    //nodemailer email sent
    const messageRes = await sendVarificationCode(otp,email,'login');

    if(!messageRes.success){
        return res.status(500).json("email can't send because of internal server error")
    }
    //response sent
    return res.status(200).json({
        otp,
        email,
        message:"OTP sent to your email",
        messageRes
    })
})


//change passoword function
const changePassword = asyncHanlder(async (req,res,next) =>{
    const info = req.body;

    //update password email 
    const user = await User.findOne({email:info.email});

    //check if new password is same to the previous one
    if(bcrypt.compareSync(info.newpassword,user.password)){
        return res.status(500).json("new password is same as previous password");
    }

    //encrypt new password
    const hashPassword = bcrypt.hashSync(info.newpassword,10);

    const updatedoc = await User.updateOne({email:info.email},{$set:{password:hashPassword}},{new:true,runValidators:true});

    //pasword updated or not
    if(!updatedoc.acknowledged){
        return res.status(401).json("unable to change password")
    }else{
        return res.status(200).json("password change successfully")
    }   
})


//logout function
const logout = asyncHanlder(async (req,res,next) =>{
    const response = new apiresponse("logout successfully",401);
    return res.status(401).clearCookie().json(response)
})


//export 
export {register,login,forgetPassword,changePassword,logout}
import User from "../models/user.model.js";
import { createToken, verifyToken } from "../utilities/auth.js";
import { sendVarificationCode } from "../services/nodeMail.js";
import bcrypt from 'bcryptjs';
import { otpgenerate } from "../utilities/otpgenarate.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import { apiError } from "../helper/CustomError.js";
import { apiresponse } from "../helper/apiResponse.js";
import path from "path";
import ejs from 'ejs';

//register function
const register = asyncHanlder(async(req,res,next)=>{
    //body
    const { name, username, email, password, img } = req.body;
    // response
    var response;

    //validate fields
    if(!name || !username || !email || !password || !img){
        response = new Error("fill all required fields!");
        response.statusCode = 400;
        response.name = "ValidationError";
        return next(response)
    }
    //user find
    const existUser = await User.findOne({$or:[
        {username:username},
        {email:email}
    ]});
    //if user exists already
    if(existUser){
        response = new apiError(
            {
                message:"User already exists!",
                name:"UserAlreadyExistsError"
            },409
        );
        return res.status(response.statusCode).json(response)
    }
    //hash password
    const hashPassword = bcrypt.hashSync(password,10);
    //user create
    await User.create({
        name,
        username,
        email,
        password:hashPassword,
        img
    }).then(async (result)=>{
        //generate otp
        const otp = otpgenerate();
        //config email
        const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:result.email,otp});
        //nodemailer email sent
        const messageRes = await sendVarificationCode(result.email,"Email varification for login",data); 
        //error on mail sending 
        if(!messageRes.success){
            response = new apiError(
                {
                    message:`Failed to send varification code!`,
                    name:"EmailDeliveryError"
                },500
            );
            return res.status(response.statusCode).json(response)
        }
        //otp saved 
        result.otp = otp;
        await result.save();
        if(result){
            const token = createToken(
                {
                    email: result.email,
                    remember: false,
                    purpose:"register"
                }
            )
            response = new apiresponse(
                `verification code send successfully to ${result.email}`,
                201
            );
            return res.cookie('auth_id',token,{
                maxAge:3600000,
                expires:new Date(Date.now+3600000),
                sameSite: "strict",
                httpOnly: true,
                secure: true
            }).status(response.statusCode).json(response)
        }
    }).catch(err=>{
        if(err){
            response = new apiError(
                {
                    message:"Error on registering user service unavailable",
                    name:"ServiceUnavailable"
                },500
            );
            return res.status(response.statusCode).json(response)
        }
    });
});


//login function
const login = asyncHanlder(async (req,res,next) =>{
    //body
    const { username, email, password, remember } = req.body;
    //response
    var response;

    //check field valid
    if(!((username || email) && password)){
        response = new apiError(
            {
                message:"Please fill all required fields!",
                name:"ValidationError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //user
    const user = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    //user not exists
    if(user===null){
        response = new Error(`User does not exists with this ${email?`email:${email}`:`username:${username}`} or ${email?"email":"usernmae"} is incorrect`);
        response.name = "UserNotExistsError";
        response.statusCode = 404;
        return next(response)
    }
    //passoword is correct or not
    if(!bcrypt.compareSync(password,user.password)){
        response = new apiError(
            {
                message:"Incorrect password",
                name:"InvalidCredenatialsError"
            },401
        );
        return res.status(response.statusCode).json(response)
    }
    //new otp
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //error on mail sending 
    if(!messageRes.success){
        response = new apiError(
            {
                message:`Failed to send varification code!`,
                name:"EmailDeliveryError"
            },500
        );
        return res.status(response.statusCode).json(response)
    }
    //otp saved
    user.otp = otp;
    await user.save();
    //token
    const token = createToken(
        {
            email,
            purpose:"login",
            remember
        }
    )
    //response config
    response = new apiresponse(
        "Verification code send successfully to your registered email",
        200
    );
    return res.cookie('auth_id',token,{
        maxAge:3600000,
        expires:new Date(Date.now+3600000),
        sameSite: "strict",
        httpOnly: true,
        secure: true
    }).status(response.statusCode).json(response)
});


//find user using email or username
const findUser = asyncHanlder(async (req,res,next)=>{
    // username or email
    const { email, username } = req.body;
    //response
    var response;

    //email or username not sent
    if(!email && !username){
        response = new apiError(
            {
                message:"Please enter username or email of your account!",
                name:"FieldEmptyError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //user 
    const user = await User.findOne(
        {
            $or:[
                {email:email},
                {username:username}
            ]
        }
    );
    //user not found
    if(user===null){
        response = new apiError(
            {
                message:`User not exists with this ${username?"username":"email"} ${username?username:email}`,
                name:"UserNotFoundError!"
            },404
        );
        return res.status(response.statusCode).json(response)
    }
    //onetime password
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //email not sent
    if(!messageRes.success){
        response = new apiError(
            {
                message:`Failed to send varification code!`,
                name:"EmailDeliveryError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //otp saved 
    user.otp = otp;
    await user.save();
    //token
    const token = createToken(
        {
            email:user.email,
            purpose:"forget password"
        }
    );

    //response res
    response = new apiresponse(`Your account has been found and OTP send to your ${user.email}`,200);
    return res.cookie('auth_id',token,{
        maxAge:3600000,
        expires:new Date(Date.now+3600000),
        sameSite: "strict",
        httpOnly: true,
        secure: true
    }).status(response.statusCode).json(response)
})


//forget password function
const resend = asyncHanlder(async (req,res,next) =>{
    //response
    var response;
    //auth info
    const authInfo = verifyToken(req.cookies.auth_id);

    //check if email exists in database
    const user = await User.findOne({email:authInfo.result.email});
    //if email is invalid
    if(!user){
        const err = new Error('Invalid email please insert valid email!');
        err.statusCode = 400;
        err.name = 'InvalidEmailError';
        return next(err)
    }
    //onetime password
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //email not sent
    if(!messageRes.success){
        response = new apiError(
            {
                message:`Failed to send varification code!`,
                name:"EmailDeliveryError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //otp saved 
    user.otp = otp;
    await user.save();
    //response sent
    response = new apiresponse("OTP send to your email successfully",200);
    //response
    return res.status(response.statusCode).json(response)
})


//set cookie for user
const verifyCode = asyncHanlder(async(req,res,next)=>{
    const { otp } = req.body;
    //response
    var response;
    //token
    var token;
    //auth info
    const authInfo = verifyToken(req.cookies.auth_id);
    
    if(otp === null){
        response = new apiError(
            {
                message:"You can't send null otp",
                name:"NullOTPError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //user
    const user = await User.findOne({email:authInfo.result.email});
    //user not exists
    if(!user){
        response = new Error("User not exists with this email!");
        response.statusCode = 404;
        response.name = "UserNotExistsError";
        return next(response)
    }
    // otp not matched
    if(otp !== user.otp){
        response = new apiError(
            {
                message:"The verification code you entered is incorrect!",
                name:"InvalidOTPError"
            },400
        );
        return res.status(response.statusCode).json(response)
    }
    //response config
    response = new apiresponse(`you ${authInfo.result.purpose} successfully`,200,{
        id: user._id,
        username: user.username,
        name: user.name,
        profileImg: user.img
    });
    //user otp to null
    user.otp = null;
    if(authInfo.result.purpose==="register"){
        user.isVerified = true;
    }
    await user.save();
    //if for one time
    if(!authInfo.result.remember){
        token = createToken({
            id: user._id,
            username: user.username,
            email: user.email
        });

        return res.cookie("uid",token,{
            maxAge:3600000,
            expires:new Date(Date.now+3600000),
            sameSite: "strict",
            httpOnly: true,
            secure: true
        }).status(response.statusCode).json(response)
    }
    //for log term
    token = createToken({
        id: user._id,
        username: user.username,
        email: user.email
    },true);
    //response
    res.clearCookie('auth_id',{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        path:'/'
    })
    res.cookie("uid",token,{
        maxAge:86400000,
        expires: new Date(Date.now()+86400000),
        sameSite:"strict",
        httpOnly: true,
        secure: true
    }).status(200).json(response);
    return res.status(response.statusCode).json(response)
})


//change passoword function
const changePassword = asyncHanlder(async (req,res,next) =>{
    //body
    const { newpassword } = req.body;
    // response
    var response;
    //auth
    const authInfo = verifyToken(req.cookies.auth_id);

    //user
    const user = await User.findOne({email:authInfo.result.email});
    //user not exists
    if(!user){
        response = new apiError(
            {
                message:"No user found with this email",
                name:"UserNotFoundError"
            },400
        )
        return res.status(response.statusCode).json(response)
    }
    //check if new password is same to the previous one
    if(bcrypt.compareSync(newpassword,user.password)){
        response = new apiresponse(
            {
                message:"new password is same as previous password!",
                name:"SamePasswordError"
            },500
        );
        return res.status(response.statusCode).json(response)
    }
    //encrypt new password
    const hashPassword = bcrypt.hashSync(newpassword,10);
    //update password
    const updatedoc = await User.updateOne(
        {
            email:info.email
        },
        {
            $set:{
                password:hashPassword
            }
        },
        {
            new:true,
            runValidators:true
        }
    );
    //pasword not updated
    if(!updatedoc.acknowledged){
        const err = new Error('unable to change password!');
        err.statusCode = 400;
        err.name = 'PasswordUpdateFailure';
        return next(err)
    }

    //response config
    response = new apiresponse("password change successfully",202);
    return res.status(response.statusCode).json(response)   
})


//logout function
const logout = asyncHanlder(async (req,res,next) =>{
    var response = new apiresponse("logout successfully",200);
    return res.clearCookie().status(response.statusCode).json(response)
})


//export 
export { register, login, findUser, resend, changePassword, verifyCode, logout}
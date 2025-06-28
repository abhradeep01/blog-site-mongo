import User from "../models/user.model.js";
import { createToken, verifyToken } from "../utilities/auth.js";
import { sendVarificationCode } from "../services/nodeMail.js";
import bcrypt from 'bcryptjs';
import { otpgenerate } from "../utilities/otpgenarate.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import { clientError, serverError } from "../helper/CustomError.js";
import { apiresponse } from "../helper/apiResponse.js";
import path from "path";
import ejs from 'ejs';
import routeResponse from "../helper/routingResponse.js";
import 'dotenv/config'

//register function
const register = asyncHanlder(async(req,res,next)=>{
    //body
    const { name, username, email, password } = req.body;
    // response
    var response;
    //validate fields
    if(!name || !username || !email || !password){
        return next(new clientError(
            "validationError",
            "fill all required fields!"
        ))
    }
    //user find
    const existUser = await User.findOne(
        {
            $or:[
                {username:username},
                {email:email}
            ]
        }
    );
    //if user exists already
    if(existUser){
        return next(new clientError(
            "userAlreadyExistsError!",
            `user already exists with ${existUser.email === email?email:username} ${existUser.email === email?"email":"username"}`,
            409
        ))
    }
    //hash password
    const hashPassword = bcrypt.hashSync(password,10);
    //user create
    await User.create({
        name,
        username,
        email,
        password:hashPassword
    }).then(async (result)=>{
        //generate otp
        const otp = otpgenerate();
        //config email
        const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:result.email,otp});
        //nodemailer email sent
        const messageRes = await sendVarificationCode(result.email,"Email varification for login",data); 
        //error on mail sending 
        if(!messageRes.success){
            return next(new serverError(
                "emailDeliveryError",
                "failed to send verification code!",
                503
            ))
        }
        if(result){
            const token = createToken(
                {
                    email: result.email,
                    otp,
                    remember: true,
                    purpose:"register"
                },'5m'
            )
            response = new routeResponse(
                '/verify',
                `verification code is sent to ${result.email} which is valid for 5 minutes`,
                200,
                result.email
            );
            return res.cookie('auth_id',token,{
                maxAge:300000 ,
                expires:new Date(Date.now+300000),
                sameSite: "strict",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            }).status(response.statusCode).json(response)
        }
    }).catch(err=>{
        // server error
        if(err){
            return next(new serverError(
                "serviceUnavailableError",
                "Error on registering user service unavailable",
                503
            ))
        }
        // client 
        return next(new serverError(
            "serviceUnavailableError",
            "something went wrong!",
            503
        ))
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
        return next(new clientError(
            "validationError",
            "filled all required fields!"
        ))
    }
    //user
    const user = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    //user not exists
    if(!user){
        return next(new clientError(
            "userDoesNotExistsError",
            `user does not exists with this ${username + " username" || email + " email"}!`,
            404
        ))
    }
    //passoword is correct or not
    if(!bcrypt.compareSync(password,user.password)){
        return next(new clientError(
            "InvalidCredenatialsError",
            "Incorrect password or username",
            401
        ))
    }
    //new otp
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //error on mail sending 
    if(!messageRes.success){
        return next(new serverError(
            "emailDeliveryError",
            "failed to send verification code!",
            503
        ));
    }
    //token
    const token = createToken(
        {
            email:user.email,
            purpose:"login",
            otp,
            remember
        },'5m'
    )
    //response config
    response = new routeResponse(
        "/verify",
        "OTP send successfully to your registered email which is valid for 5 minutes",
        200,
        user.email
    );
    return res.cookie('auth_id',token,{
        maxAge:300000,
        expires:new Date(Date.now+300000),
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
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
        return next(new clientError(
            "validationError",
            "Please enter username or email of your account!"
        ))
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
    if(!user){
        return next(new serverError(
            "userDoesNotExistsError!",
            `User not exists with this ${username?"username":"email"} ${username?username:email}`,
            404
        ))
    }
    //onetime password
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //email not sent
    if(!messageRes.success){
        return next(new serverError(
            "emailDeliveryError",
            "failed to send verification code!",
            503
        ))
    }
    //token
    const token = createToken(
        {
            email:user.email,
            otp,
            remember:false,
            purpose:"forget password"
        },'5m'
    );

    //response res
    response = new apiresponse(
        `Your account has been found and OTP send to your email OTP is valid for 5 minutes`,
        200,
        user.email
    );
    return res.cookie('auth_id',token,{
        maxAge:300000,
        expires:new Date(Date.now+300000),
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }).status(response.statusCode).json(response)
})


//forget password function
const resend = asyncHanlder(async (req,res,next) =>{
    //response
    var response;
    //auth info
    const authInfo = verifyToken(req.cookies.auth_id);
    //check if email exists in database
    const user = await User.findOne(
        {
            email:authInfo.result.email
        }
    );
    //if email is invalid
    if(!user){
        return next(new clientError(
            "invalidEmailError",
            'Invalid email please insert valid email!'
        ))
    }
    //onetime password
    const otp = otpgenerate();
    //config email
    const data = await ejs.renderFile(path.join(import.meta.dirname,"../views/templates/email/otpLoginMail.ejs"),{email:user.email,otp});
    //nodemailer email sent
    const messageRes = await sendVarificationCode(user.email,"Email varification for login",data); 
    //email not sent
    if(!messageRes.success){
        return next(new serverError(
            "emailDeliveryError",
            "failed to send verification code!",
            503
        ))
    }
    const token = createToken(
        {
            email:user.email,
            otp,
            purpose:'resend otp',
            remember:authInfo.result?.remember
        },'5m'
    )
    //response consfig
    response = new apiresponse(
        "OTP send to your email successfully which is valid for 5 minutes",
        200,
        user.email
    );
    //response
    return res.cookie('auth_id',token,{
        maxAge:300000,
        expires:new Date(Date.now+300000),
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }).status(response.statusCode).json(response)
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
    //if otp not send
    if(!otp){
        return next(new clientError(
            "NullOTPError",
            "Please enter the OTP!"
        ))
    }
    //user
    const user = await User.findOne(
        {
            email:authInfo.result.email
        }
    );
    //user not exists
    if(!user){
        return next(new clientError(
            "userDoesNotExistsError",
            "User not exists with email!",
            404
        ))
    }
    // otp not matched
    if(Number(otp) !== authInfo.result.otp){
        return next(new clientError(
            "invalidOTPError",
            "The verification code you entered is incorrect!",
            400
        ))
    }
    //response config
    response = new routeResponse(
        "/",
        `you ${authInfo.result.purpose} successfully`,
        200,
        {
            id: user._id,
            username: user.username,
            name: user.name,
            profileImg: user.img
        }
    );
    //user otp to null
    user.otp = null;
    if(authInfo.result.purpose==="register"){
        user.isVerified = true;
        await user.save();
    }
    //for log term
    token = createToken({
        id: user._id,
        username: user.username,
        email: user.email
    },authInfo.result.remember?'24h':'1h');
    //response
    res.clearCookie('auth_id',{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        path:'/'
    })
    res.cookie("uid",token,{
        maxAge:authInfo.result.remember?86400000:3600000,
        expires: new Date(Date.now()+authInfo.result.remember?86400000:3600000),
        sameSite:"strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })
    return res.status(response.statusCode).json(response);
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
    const user = await User.findOne(
        {
            email:authInfo.result.email
        }
    );
    //user not exists
    if(!user){
        return next(new clientError(
            "userDoesNotExistsError",
            "No user found with this email",
            404
        ))
    }
    //check if new password is same to the previous one
    if(bcrypt.compareSync(newpassword,user.password)){
        return next(new clientError(
            "samePasswordError",
            'new password is same as previous password!'
        ))
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
        return next(new serverError(
            "passwordUpdateFailure",
            'unable to change password!',
            503
        ))
    }
    //response config
    response = new routeResponse(
        "/changed",
        "password change successfully",
        202,
    );
    return res.status(response.statusCode).json(response)   
})


//logout function
const logout = asyncHanlder(async (req,res,next) =>{
    var response = new routeResponse(
        "/login",
        "logout successfully",
        200
    );
    return res.clearCookie('uid',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"strict",
        path:'/'
    }).status(response.statusCode).json(response)
})


//export 
export { register, login, findUser, resend, changePassword, verifyCode, logout}
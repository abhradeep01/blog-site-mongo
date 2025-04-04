import User from "../models/user.model.js";
import { createToken } from "../services/auth.js";
import { sendVarificationCode } from "../services/nodeMail.js";
import bcrypt from 'bcryptjs';
import { otpgenerate } from "../utilities/otpgenarate.js";
import asyncHanlder from "../middleware/asyncHandler.js";
import { apiError } from "../utilities/CustomError.js";
import { apiresponse } from "../utilities/apiResponse.js";
import path from "path";
import ejs from 'ejs';

//register function
const register = asyncHanlder(async(req,res,next)=>{
    const {name, username, email, password, img} = req.body;
    var response;

    //validate fields
    if(!name || !username || !email || !password || !img){
        const err = new Error("fill all required fields!");
        err.statusCode = 409;
        err.name = "Conflict";
        return next(err)
    }

    //user find
    const existUser = await User.findOne({$or:[
        {username:username},
        {email:email}
    ]});

    //if user exists already
    if(existUser){
        response = new apiError("User already exists!",400);
        return res.status(response.statusCode).json(response)
    }

    //hash password
    const hashPassword = bcrypt.hashSync(password,10);

    //user create
    const newUser = await User.create({
        name,
        username,
        email,
        password:hashPassword,
        img
    })
    res.json(newUser)
})


//set cookie for register
const setCookieRegister = asyncHanlder(async(req,res,next)=>{
    const { user, otpMatched } = req.body;
    var response;

    //opmatched not 
    if(!otpMatched){
        const err = new Error("OTP isn't matched!");
        err.statusCode = 400;
        err.name = "OTP not matched";
        return next(err)
    }

    //hash password
    const hashPassword = bcrypt.hashSync(user.password,10);

    //user
    const newUser = await User.create({
        name: user.fullname,
        username: user.username,
        email: user.email,
        password: hashPassword,
        img: user.url
    }).then(result=>{
        return{
            success:true,
            result
        }
    }).catch(err=>{
        return {
            success: false,
            err
        }
    });

    //if new user isn't created
    if(!newUser.success){
        response = new apiError("User isn't registered during server error!",500);
        return res.status(response.statusCode).json(response)
    }

    //token
    const token = createToken({
        id: newUser.result._id,
        username: newUser.result.username,
        password: newUser.result.password
    },true);

    // response config 
    response = new apiresponse("User created successfully",201,{
        _id: newUser.result._id,
        username: newUser.result.username,
        profileImg: newUser.result.img
    });
    return res.cookie('uid',token).status(response.statusCode).json(response)
})


//login function
const login = asyncHanlder(async (req,res,next) =>{
    const userInfo = req.body;
    var response;
   
    //if any field is empty
    if(!(userInfo.email && userInfo.password)){
        response = new apiError("please fill all required fields!",400);
        return res.status(response.statusCode).json(response)
    }
    const user = await User.findOne({email:userInfo.email});

    //user does not exists
    if(!user){
        response = new apiError("User doesn't exists",404);
        return res.status(404).json(response);
    }

    //password correct
    const isCorrect = bcrypt.compareSync(userInfo.password,user.password);
    if(!isCorrect){
        response = new apiError("Incorrect Password",401);
        return res.status(401).json(response);
    }

    //token
    var token ;
    var response;
    //short term cookie set
    response = new apiresponse(`Welcome back ${user.username}`,200,{
        id: user._id,
        name: user.name,
        username: user.username,
        profileImg: user.img
    });
    if(!userInfo.remember){
        //token
        token = await createToken({
            id:user._id,
            username:user.username,
            password:user.password
        });

        //set cookie for short term
        return res.status(response.statusCode).cookie("uid",token,{
            maxAge:1000*60*60,
            expires:new Date(Date.now()+(1000*60*60)),
            httpOnly:true,
            sameSite:'strict',
            secure:true,
        }).json(response)
    }

    //set cookie for long term
    token = await createToken({
        id:user._id,
        username:user.username,
        password:user.password
    },true);

    //cookie setting for long term
    return res.cookie("uid",token,{
        maxAge:3600000 ,
        expires:new Date(Date.now()+3600000),
        httpOnly:true,
        sameSite:'strict',
        secure:true,
    }).status(response.statusCode).json(response)
});


//forget password function
const confirmEmail = asyncHanlder(async (req,res,next) =>{
    const { email, username } = req.body;
    var response;

    //check if email exists in database
    const user = await User.findOne({$or:[
        {email:email},
        {username:username}
    ]});

    //if email is invalid
    if(!user){
        const err = new Error(email?
            'Invalid email please insert valid email!':
            "Invalid username please insert valid username"
        );
        err.statusCode = 400;
        err.name = email?'Invalid email!':'Invalid username!';
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
        response = new apiError(messageRes.err,400);
        return res.status(response.statusCode).json(response)
    }

    //response sent
    response = new apiresponse("OTP send to your email",200,{
        messageId:messageRes.response.messageId
    });
    return res.status(response.statusCode).json(response)
})


//set cookie for user
const setCookieLogIn = asyncHanlder(async(req,res,next)=>{
    const { otpMatched,remember } = req.body;
    var response;
    var token;

    //if otp is not matched
    if(!otpMatched){
        response = new apiError("Otp isn't matched please enter valid!",400);
        return next(response)
    }

    //user info
    

    //if remember isn't true
    if(!remember){
        token = createToken()
    }

    //response config
    response = new apiresponse("your cookie is set successfully",200);
    return res.cookie('uid',token,{
        maxAge:3600000,
        expires:new Date(Date.now()+3600000),
        sameSite:"strict",
        httpOnly:true,
        secure:true
    }).status(response.statusCode).json(response)
})


//change passoword function
const changePassword = asyncHanlder(async (req,res,next) =>{
    const info = req.body;
    var response;

    //update password email 
    const user = await User.findOne({email:info.email});

    //check if new password is same to the previous one
    if(bcrypt.compareSync(info.newpassword,user.password)){
        response = new apiresponse("new password is same as previous password!",500);
        return res.status(response.statusCode).json(response)
    }

    //encrypt new password
    const hashPassword = bcrypt.hashSync(info.newpassword,10);

    const updatedoc = await User.updateOne({email:info.email},{$set:{password:hashPassword}},{new:true,runValidators:true});

    //pasword not updated
    if(!updatedoc.acknowledged){
        const err = new Error('unable to change password!');
        err.statusCode = 400;
        err.name = 'update failer';
        return next(err)
    }

    //response config
    response = new apiresponse("password change successfully",202);
    return res.status(response.statusCode).json(response)   
})


//logout function
const logout = asyncHanlder(async (req,res,next) =>{
    var response = new apiresponse("logout successfully",200);
    return res.status(response.statusCode).clearCookie().json(response)
})


//export 
export { register, login, confirmEmail, changePassword, setCookieLogIn, setCookieRegister, logout}
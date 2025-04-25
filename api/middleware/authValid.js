import { json } from "express";
import { apiError } from "../helper/CustomError.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import { verifyToken } from "../utilities/auth.js";

const authValid = asyncHanlder(async (req,res,next)=>{
    //token
    const authToken = req.cookies.auth_id;
    //response
    var response;
    //token not exists
    if(!authToken){
        response = new apiError(
            {
                message:"Unauthenticated user",
                name:"UnauthenticatedError"
            },401
        );
        return res.status(response.statusCode).json(response)
    }

    const authInfo = verifyToken(authToken);
    //cookie expired
    if(!authInfo.success){
        response = new apiError(
            {
                message:"user session expired!",
                name:"SessionExpiredError"
            },401
        );
        return res.status(response.statusCode).json(response)
    }
    next()
})

export default authValid;
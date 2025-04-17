import { verifyToken } from "../utilities/auth.js";
import { apiError } from "../helper/CustomError.js";
import asyncHanlder from "../utilities/asyncHandler.js";

//is valid with 
export const isValid = asyncHanlder(async (req,res,next) =>{
    const token = req.cookies.uid;
    var response;

    //if token doesn't exists
    if(!token){
        response = new apiError({message:"Unauthenticated User",name:"Unauthenticated"},401);
        return res.status(response.statusCode).json(response)
    }

    //decode token
    const info = verifyToken(token);

    if(info.success===false){
        response = new apiError(
            {
                message:"Your session expired. Please login again",
                name:"SessionExpired"
            },401
        );
        return res.status(response.statusCode).json(response)
    }

    //next
    next()
})

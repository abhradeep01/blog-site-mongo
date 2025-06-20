import { verifyToken } from "../utilities/auth.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import routeResponse from "../helper/routingResponse.js";

//is valid with 
export const isValid = asyncHanlder(async (req,res,next) =>{
    const token = req.cookies.uid;
    var response;
    //if token doesn't exists
    if(!token){
        response = new routeResponse(
            '/login',
            'unauthenticted user please login!',
            401,
            null,
            "unauthenticatedUserError"
        );
        return res.status(response.statusCode).json(response)
    }
    //decode token
    const info = verifyToken(token);
    // token session expired
    if(info.success===false){
        response = new routeResponse(
            '/login',
            'session expired login again!',
            401,
            null,
            "userSessionExpired"
        );
        return res.status(response.statusCode).json(response)
    }
    //next
    next()
})

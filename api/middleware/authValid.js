import routeResponse from "../helper/routingResponse.js";
import asyncHanlder from "../utilities/asyncHandler.js";
import { verifyToken } from "../utilities/auth.js";

const authValid = asyncHanlder(async (req,res,next)=>{
    //token
    const authToken = req.cookies.auth_id;
    //response
    var response;
    //token not exists
    if(!authToken){
        response = new routeResponse(
            '/login',
            'unauthenticted user please login!',
            401,
            "",
            "unauthenticatedError"
        );
        return res.status(response.statusCode).json(response)
    }
    // token decoded
    const authInfo = verifyToken(authToken);
    //cookie expired
    if(!authInfo.success){
        response = new routeResponse(
            '/login',
            'session expired login again!',
            401,
            "",
            "userSessionExpired"
        );
        return res.status(response.statusCode).json(response)
    }
    // next
    next()
})

export default authValid;
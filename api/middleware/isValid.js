import { verifyToken } from "../services/auth.js";
import { apiresponse } from "../utilities/apiResponse.js";
import { apiError } from "../utilities/CustomError.js";

//is valid with 
export const isValid = async (req,res,next) =>{
    try {
        const token = req.cookies.uid;
        var response;

        //if token doesn't exists
        if(!token){
            response = new apiError("Unauthenticated User!",401);
            return res.status(response.statusCode).json(response)
        }

        //decode token
        const info = verifyToken(token);

        if(info.success===false){
            response = new apiError("cookies expired!",400);
            return res.status(response.statusCode).json(response)
        }

        //next
        next()
    } catch (error) {
        console.log(error);
    }
}

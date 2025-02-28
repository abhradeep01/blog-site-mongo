import { verifyToken } from "../services/auth.js";

//is valid with 
export const isValid = async (req,res,next) =>{
    try {
        const token = req.cookies.SESSIONTOKEN;

        //if token doesn't exists
        if(!token){
            return res.status(401).json("User is not authenticated");
        }

        //decode token
        const info = verifyToken(token);
        // console.log(info);

        if(info.success===false){
            return res.status(401).json(`${info.message}`)
        }

        //next
        next()
    } catch (error) {
        console.log(error);
    }
}

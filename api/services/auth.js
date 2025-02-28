import jwt from 'jsonwebtoken';
import 'dotenv/config';

//verify token
export const verifyToken = (token,secret=process.env.ACCESS_TOKEN_KEY) =>{

    //return user info
    return jwt.verify(token,secret,(err,result)=>{
        if(err){
            return {
                message:err,
                success:false
            }
        }
        return {
            result,
            success:true
        }
    })
}


//token creat
export const createToken = async (payload={},remember=false,secret=process.env.ACCESS_TOKEN_KEY) =>{
    //token
    const token = jwt.sign(payload,secret,{expiresIn:remember?'30d':'1m',});

    return token;
}
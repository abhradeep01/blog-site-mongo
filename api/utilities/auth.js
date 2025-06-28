import jwt from 'jsonwebtoken';
import 'dotenv/config';

//verify token
const verifyToken = (token,secret=process.env.ACCESS_TOKEN_KEY) =>{
    //return user info
    return jwt.verify(token,secret,(err,result)=>{
        if(err){
            return {
                err,
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
const createToken = (payload={},time,secret=process.env.ACCESS_TOKEN_KEY)=>{
    //token
    const token = jwt.sign(payload,secret,{expiresIn:time});
    return token;
}

//export
export {createToken,verifyToken}
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
const createToken = (payload={},remember,secret=process.env.ACCESS_TOKEN_KEY) =>{
    //token
    const token = jwt.sign(payload,secret,{expiresIn:remember?'24h':'1h'});

    return token;
}

//export
export {createToken,verifyToken}
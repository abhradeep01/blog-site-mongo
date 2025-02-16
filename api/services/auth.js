import jwt from 'jsonwebtoken';
import 'dotenv/config';

//verify token
export const verifyToken = (token) =>{
    //secret
    const secret = process.env.ACCESS_KEY;

    //return user info
    return jwt.verify(token,secret)
}


//token create
export const createToken = (payload={}) =>{
    //secret 
    const secret = process.env.ACCESS_KEY;

    //token
    const token = jwt.sign(payload,secret,{algorithm:process.env.ENCTYPT_ALGO});

    return token;
}
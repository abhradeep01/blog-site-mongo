import { sendVarificationCode } from "../services/nodeMail.js";

//register function
export const register = async (req,res) =>{
    res.send('registered successfully!');
}


//login function
export const login = async (req,res) =>{
    res.send('login successfully');
}


//forget password function
export const forgetPassword = (req,res) =>{
    const resemail = sendVarificationCode(
        6734,
        req.body.email,
        'saaddd',
        'login'
    )
    if(resemail){
        res.status(200).send(resemail)
    }
}


//logout function
export const logout = async (req,res) =>{
    res.send('logout successfully!');
}
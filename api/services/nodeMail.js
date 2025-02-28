import { transporter } from "../config/nodemailer.config.js";

//send vrification code
export const sendVarificationCode = async (code,receiver,purspose) =>{
    // sending varification code
    const res = await transporter.sendMail(
        {
            to: receiver,
            subject:'OTP for email varification',
            html:`<p>one time password <code>${code}</code> for ${purspose}</p>`
        }
    ).then(response=>{
        return {
            success:true,
            response
        }
    }).catch(err=>{
        return {
            success:false,
            err
        }
    })
    return res;
}

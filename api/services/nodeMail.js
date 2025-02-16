import { transporter } from "../config/nodemailer.config.js";

//send vrification code
export const sendVarificationCode = async (code,receiver,username,purspose) =>{
    // sending varification code
    const res = await transporter.sendMail(
        {
            to: receiver,
            subject: `varification code for ${purspose}`,
            
            html:`<p>${username}your varification code is: ${code}</p>`
        }
    ).catch(err=>{
        console.log(err);
    })
    return res
}

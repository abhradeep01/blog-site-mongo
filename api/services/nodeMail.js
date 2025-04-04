import { transporter } from "../config/nodemailer.config.js";

//send vrification code
export const sendVarificationCode = async (receiver,subject,template) =>{
    // sending varification code
    const res = await transporter.sendMail(
        {
            from:process.env.BLOG_SITE_MAIL_USER,
            to: receiver,
            subject:subject,
            html:template
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
    });
    
    //send response
    return res;
}

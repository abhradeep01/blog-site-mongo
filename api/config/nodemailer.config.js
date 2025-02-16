import nodemailer from 'nodemailer';
import 'dotenv/config';

//nodemailer config 
export const transporter = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth:{
        user: process.env.BLOG_SITE_MAIL_USER,
        pass: process.env.BLOG_SITE_MAIL_PASS
    }
})

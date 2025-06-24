export type loginInput = {
    type:string;
    password:string;
}

export type passwordSet = {
    newPassword:string;
    confirmPassword:string;
}

export type registerInput = {
    fullname:string;
    username:string;
    email:string;
    password:string;
    confirm:string;
    type:string;
}
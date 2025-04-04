import {axiosClient} from '../../config/axios'

//register
const register = async (userData) =>{
    const res = await axiosClient.post('/auth/register',userData);

    return res.data.data
}

//registration confirmation
const confirmEmail = async (email) =>{
    const res = await axiosClient.post()
}


//login
const login = async (userData) =>{
    const res = await axiosClient.post('/auth/login',userData);

    if(res.status===200){
        localStorage.setItem('currentuser',JSON.stringify(...res.data.data.otherInfo));
    }
    
    return res.data.data;
}


//forget password
const forgetpassword = async (email) =>{
    const res = await axiosClient.post('/auth/forgetpassword',email);

    return res.data.data
}

//change password
const changepassword = async (email) =>{
    const res = await axiosClient.post('/auth/changepassword',email);

    return res.data.data
}

//logout
const logout = async () =>{
    localStorage.removeItem('currentuser');
}

const authService = {
    register,
    login,
    forgetpassword,
    changepassword,
    logout
}

export default authService;
import { createAsyncThunk } from '@reduxjs/toolkit';
import useLocalstorage from '../../hooks/useLocalstorage';
import axiosClient from '../../config/axios';

const {removeAuth,setAuth} = useLocalstorage;

//register
const register = createAsyncThunk(
    'auth/register', 
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.post('/auth/register',data);
            setAuth('email_sended',res.data.data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
) 


//login
const login = createAsyncThunk(
    'auth/login',
    async (data, thunkApi) =>{
        try {
            const res = await axiosClient.post('/auth/login',data);
            setAuth('sended_email',res.data.data);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error?.response?.data)
        }
    }
) 


//verify code
const verify = createAsyncThunk(
    'auth/verify',
    async (data, thunkApi) =>{
        try {
            const res = await axiosClient.post('/auth/verify',{otp:data.otp});
            //success
            removeAuth('sended_email')
            setAuth('currentuser',res.data.data);
            return res.data   
        } catch (error) {
            return thunkApi.rejectWithValue(error?.response?.data)
        }
    }
) 


//resend code
const resend = createAsyncThunk(
    'auth/resend',
    async (_,thunkApi) =>{
        try {
            const res = await axiosClient.post('/auth/resend');
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error?.response?.data)
        }
    }
)


//find user by email or username
const findAccount = createAsyncThunk(
    'auth/find',
    async (data, thunkApi) =>{
        try {
            const res = await axiosClient.post('/auth/find',data);
            setAuth('sended_email',res.data.data);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 
    

//change password
const changePassword = createAsyncThunk(
    'auth/changepassword',
    async (data, thunkApi) =>{
        try {
            const res = await axiosClient.patch('/auth/changepassword',data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)           
        }
    }
)    


//logout
const logout = createAsyncThunk(
    'auth/logout',
    async (_,thunkApi) => {
        try {
            const res = await axiosClient.post('/auth/logout');
            //success
            removeAuth('sended_email');
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

//export
export {
    register,
    login,
    verify,
    resend,
    findAccount,
    changePassword,
    logout
}
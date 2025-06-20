import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../config/axios";


//get user
const getuser = createAsyncThunk(
    'user/getuser',
    async (userid,thunkApi) =>{
        try {
            const res = await axiosClient.post(`/user/${userid}`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//user posts
const userPosts = createAsyncThunk(
    'user/posts',
    async (userid, thunkApi) =>{
        try {
            const res = await axiosClient.get(`/user/${userid}/posts`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)


//user change
const userChange = createAsyncThunk(
    'user/change',
    async (data,thunkApi) =>{
        try {
            const { id, ...rest } = data;
            const res = await axiosClient.patch(`/user/${id}/change`,{
                ...rest
            });
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


//user delete
const userDelete = createAsyncThunk(
    'user/delete',
    async (userid, thunkApi) =>{
        try {
            const res = await axiosClient.delete(`/user/${userid}/delete`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 

//export
export {
    getuser,
    userPosts,
    userChange,
    userDelete
}
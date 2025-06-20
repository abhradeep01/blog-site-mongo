import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axios";

//profile
const getprofile = createAsyncThunk(
    'profile/',
    async (_,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.get(`/profile/`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


//posts
const profilePosts = createAsyncThunk(
    'profile/posts',
    async (_,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.get(`/profile/posts`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)        
        }
    }
)


//liked
const profileLiked = createAsyncThunk(
    'profile/liked',
    async (_,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.get(`/profile/liked`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }  
)


//saved
const profileSaved = createAsyncThunk(
    'profile/saved',
    async (_,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.get(`/profile/saved`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 

//export
export {
    getprofile,
    profileLiked,
    profilePosts,
    profileSaved
}
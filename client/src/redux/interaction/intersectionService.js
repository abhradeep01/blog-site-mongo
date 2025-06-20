import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axios.config";


//liked
const liked = createAsyncThunk(
    'interaction/liked',
    async (id,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.post(`/interaction/${id}/liked`);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//unliked
const unliked = createAsyncThunk(
    'interaction/unliked',
    async (id,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.delete(`/interaction/${id}/unliked`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
); 


//bookmarked
const bookmarked = createAsyncThunk(
    'interaction/bookmarked',
    async (id,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.post(`/interaction/${id}/saved`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


//unbookmarked
const unbookmarked = createAsyncThunk(
    'interaction/unbookmarked',
    async (id,thunkApi) =>{
        try {
            const res = await axiosConfig.axiosClient.post(`/interaction/${id}/unsaved`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 

//export
export {
    liked,
    unliked,
    bookmarked,
    unbookmarked
}
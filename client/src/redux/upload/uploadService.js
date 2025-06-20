import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../config/axios";

// user image upload
const userimgupload = createAsyncThunk(
    'upload/userimg',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.post(`/upload/userimg`,data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


// user image delete
const userimgdelete = createAsyncThunk(
    'delete/userimg',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.delete(`/upload/userimg`,data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//post image upload 
const postimgupload = createAsyncThunk(
    'upload/postimg',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.post(`/upload/postimg`,data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//post image delete
const postimgdelete = createAsyncThunk(
    'delete/postimg',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.delete(`/upload/postimg`,data);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

//export
export {
    userimgupload,
    userimgdelete,
    postimgupload,
    postimgdelete
}
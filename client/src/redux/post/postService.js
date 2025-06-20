import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../config/axios";


//get posts
const posts = createAsyncThunk(
    'posts/',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.get(`/posts?cat=${data.type}`);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


//get post page
const getPage = createAsyncThunk(
    'posts/getpage',
    async (id,thunkApi) =>{
        try {
            const res = await axiosClient.get(`/posts${id}`);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
) 


//add post
const addPost = createAsyncThunk(
    'posts/addpost',
    async (data,thunkApi) => {
        try {
            const res = await axiosClient.post('/posts/addpost',{...data});
            return res.data.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)           
        }
    }
) 


//post change
const postChange = createAsyncThunk(
    'posts/change',
    async (data,thunkApi) =>{
        try {
            const { id, ...rest } = data;
            const res = await axiosClient.patch(`/posts/${id}/change`,{...rest});
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 


// post delete 
const postDelete = createAsyncThunk(
    'posts/delete',
    async (id,thunkApi) =>{
        try {
            const res = await axiosClient.delete(`/posts/${id}/delete`);
            return res.data    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
) 

//export
export {
    posts,
    getPage,
    addPost,
    postChange,
    postDelete
}
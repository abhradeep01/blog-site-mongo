import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../config/axios';



//get post comments
const getComments = createAsyncThunk(
    'comment/getcomments',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.get(`/comment/${data.id}`);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//add comment
const addComment = createAsyncThunk(
    'comment/add',
    async (data,thunkApi) =>{
        try {
            const { id, ...rest } = data;
            const res = await axiosClient.post(`/comment/${id}/add`,{...rest});
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//comment edit
const editComment = createAsyncThunk(
    'comment/edit',
    async (data,thunkApi) =>{
        try {
            const { id, ...rest } = data;
            const res = await axiosClient.patch(`/comment/${id}/edit`,{...rest});
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);


//delete comment
const deleteComment = createAsyncThunk(
    'comment/delete',
    async (data,thunkApi) =>{
        try {
            const res = await axiosClient.delete(`/comment/${data.id}/delete`);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

//export
export {
    getComments,
    addComment,
    editComment,
    deleteComment
}
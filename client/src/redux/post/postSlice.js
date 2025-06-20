import { createSlice } from '@reduxjs/toolkit';
import { posts, getPage, addPost, postChange, postDelete } from './postService'

//initial state
const initialState = {
    isLoading: false,
    data: null,
    isError: false,
    errorData: null,
    isSuccess: false
};

//post slice
const postSlice = createSlice({
    name:'post',
    initialState,
    extraReducers:(builder)=>{
        // posts
        builder.addCase(posts.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorData = null;
            state.data = null;
        });
        builder.addCase(posts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(posts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload
        });
        //get post
        builder.addCase(getPage.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getPage.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getPage.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //add post
        builder.addCase(addPost.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(addPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(addPost.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //post change
        builder.addCase(postChange.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(postChange.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(postChange.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //post delete
        builder.addCase(postDelete.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(postDelete.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(postDelete.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
    }
})

export default postSlice.reducer;
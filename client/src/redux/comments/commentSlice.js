import { createSlice } from '@reduxjs/toolkit';
import { addComment, deleteComment, editComment, getComments } from './commentService';

//initial state
let initialState = {
    isLoading: false,
    data: null,
    isError: false,
    errorData: null
};

//comment slice
const commentSlice = createSlice({
    name:'comment',
    initialState,
    extraReducers:(builder)=>{
        //post comments
        builder.addCase(getComments.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getComments.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(getComments.rejected,(state,action)=>{
            state.isError = true;
            state.errorData = action.payload;
        });
        //comment add to post
        builder.addCase(addComment.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(addComment.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(addComment.rejected,(state,action)=>{
            state.isError = true;
            state.errorData = action.payload;
        });
        //comment edit
        builder.addCase(editComment.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(editComment.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(editComment.rejected,(state,action)=>{
            state.isError = true;
            state.errorData = action.payload;
        });
        //comment delete
        builder.addCase(deleteComment.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(deleteComment.rejected,(state,action)=>{
            state.isError = true;
            state.errorData = action.payload;
        });
    }
});

//export
export default commentSlice.reducer;
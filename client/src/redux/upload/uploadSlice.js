import { createSlice } from '@reduxjs/toolkit'
import { userimgupload, userimgdelete, postimgupload, postimgdelete } from './uploadService'

//initial state
let initialState = {
    isLoading:false,
    data: null,
    isError: false,
    errorData: null
};

const uploadSlice = createSlice({
    name:'upload',
    initialState,
    extraReducers:(builder)=>{
        //image upload for user
        builder.addCase(userimgupload.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(userimgupload.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(userimgupload.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //user image delete
        builder.addCase(userimgdelete.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(userimgdelete.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(userimgdelete.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //post image upload
        builder.addCase(postimgupload.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(postimgupload.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(postimgupload.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //post image upload 
        builder.addCase(postimgdelete.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(postimgdelete.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(postimgdelete.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
    }
});

export default uploadSlice.reducer;
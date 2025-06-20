import { createSlice } from '@reduxjs/toolkit';
import { getprofile, profilePosts, profileLiked, profileSaved } from './profileService'

//initial state
let initialState = {
    isLoading: false,
    data: null,
    isError: false,
    errorData: null,
    isSuccess:false
}

//profile slice
const profileSlice = createSlice({
    name:'profile',
    initialState,
    extraReducers:(builder)=>{
        //get profile
        builder.addCase(getprofile.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorData = null;
            state.data = null;
        });
        builder.addCase(getprofile.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getprofile.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //get profile posts
        builder.addCase(profilePosts.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(profilePosts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(profilePosts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //get profile liked posts
        builder.addCase(profileLiked.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(profileLiked.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(profileLiked.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //get profile saved posts
        builder.addCase(profileSaved.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(profileSaved.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(profileSaved.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
    }
})


export default profileSlice.reducer;
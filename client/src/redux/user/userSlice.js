import { createSlice, } from '@reduxjs/toolkit'
import { getuser, userPosts, userChange, userDelete } from './userService'

//initial state
let initialState = {
    isLoading: false,
    data: null,
    isError: false,
    errorData: null
}

//create slice
const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=>{
        //for user profile
        builder.addCase(getuser.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(getuser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getuser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        // for users posts
        builder.addCase(userPosts.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(userPosts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(userPosts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //for user info change
        builder.addCase(userChange.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(userChange.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(userChange.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //user account delete
        builder.addCase(userDelete.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(userDelete.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(userDelete.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
    }
});

export default  userSlice.reducer ;
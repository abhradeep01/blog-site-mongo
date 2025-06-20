import { createSlice } from '@reduxjs/toolkit';
import { register, login, findAccount, resend, changePassword, verify, logout } from './authService'

//initial state
const initialState = {
    isLoading: false, 
    isSuccess:false,
    data: null,
    isError:false,
    errorData: null
};

//slice
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reSet:()=>initialState
    },
    extraReducers:(builder)=>{
        //register
        builder.addCase(register.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(register.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //login
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //find
        builder.addCase(findAccount.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(findAccount.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(findAccount.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //resend
        builder.addCase(resend.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(resend.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(resend.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //change password
        builder.addCase(changePassword.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(changePassword.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(changePassword.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //verify
        builder.addCase(verify.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(verify.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(verify.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
        //logout
        builder.addCase(logout.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.errorData = null;
        });
        builder.addCase(logout.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(logout.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        });
    }
});

export const { reSet } = authSlice.actions

export default authSlice.reducer;
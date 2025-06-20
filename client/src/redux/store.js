import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import uploadReducer from './upload/uploadSlice';
import profileReducer from './profile/profileSlice';
import postReducer from './post/postSlice';
import authReducer from './auth/authSlice';
import commentReducer from './comments/commentSlice';

// store config
const store = configureStore({
    reducer:{
        user: userReducer,
        upload: uploadReducer,
        profile: profileReducer,
        post: postReducer,
        auth: authReducer,
        comment: commentReducer
    }
});

export default store;
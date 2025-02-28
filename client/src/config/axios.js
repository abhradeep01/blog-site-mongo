import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_URL,
    headers:{
        'Content-Type':'application/json',
        'Authorization':"",
    },
    withCredentials:true
});

export const googleAuth = axios.create({
    baseURL: import.meta.env.VITE_GOOGLE_AUTH_KEY,
    headers:{
        'Content-Type':'application/json'
    },
})



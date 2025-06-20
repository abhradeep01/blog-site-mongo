import React from 'react';
import InputBox from '../../components/auth/InputBox';
import PasswordBox from '../../components/auth/PasswordBox';
import { CircularProgress, FormControlLabel, Switch } from '@mui/material';
import GoogleAuth from '../../components/auth/GoogleAuth';
import OrAuth from '../../components/auth/OrAuth';
import AuthAlert from '../../components/auth/AuthAlert';
import AuthSuccess from '../../components/auth/AuthSuccess';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authService';
import validator from 'validator';
import { useNavigate } from 'react-router';
import { reSet } from '../../redux/auth/authSlice';

function Login() {
    //info 
    const [inputs,setInputs] = React.useState({
        type:"",
        password:""
    });
    //checked
    const [checked,setChecked] = React.useState(false);
    //navigation
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();
    //selector
    const state = useSelector((state)=>state.auth);

    // useeffect 
    React.useEffect(()=>{
        if(state.isSuccess){
            setTimeout(() => {
                navigate(state?.data?.route);
                dispatch(reSet());
            }, 1000);
        }
    },[state.isSuccess,state.isError,navigate,dispatch]);
    console.log(state);

    //handle change
    const handleChange = (e) =>{
        e.preventDefault()
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    // login
    const submitLogin = async (e) =>{
        e.preventDefault();
        dispatch(login({
            [validator.isEmail(inputs.type)?'email':'username']: inputs.type,
            password: inputs.password,
            remember: checked
        }));
    }

    
    return (
        <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[99%] mobile:border-red-500 flex flex-col justify-center items-center shadow shadow-slate-200 bg-neutral-300 rounded">
            <h2 className="text-center font-varela-round text-lg text-emerald-600 font-bold mb-4">LogIn</h2>
            <form className='w-full flex flex-col gap-[1.5rem]' onSubmit={submitLogin}>
                <InputBox placeholder="Username or Email" name="type" value={inputs.type} onChange={handleChange}/>
                <div className="w-full flex flex-col">
                    <PasswordBox placeholder="Password" name="password" value={inputs.password} onChange={handleChange}/>
                    <div className="flex flex-row items-center justify-between">
                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={checked}
                                    onChange={()=>setChecked(!checked)}
                                    color='success'
                                />
                            }
                            label={
                                <p className='text-[1.025rem] text-slate-700 font-didact-gothic'>
                                    Remember Me
                                </p>
                            }
                        />
                        <a href="/forget" className='text-red-500 text-[0.95rem] font-medium font-didact-gothic'>Forget Password?</a>
                    </div>
                </div>
                {/* auth error alert */}
                {
                    state.isError &&
                    <AuthAlert message={state?.errorData?.message} state={state.isError}/>
                }
                <div className='w-full flex flex-col items-center gap-[0.8rem]'>
                    <button type='submit' className='w-full bg-blue-500 py-1.5 rounded text-white font-sen font-light capitalize hover:cursor-pointer hover:opacity-95 flex items-center justify-center gap-2 shadow' >
                        login {state.isLoading? <CircularProgress size={18} sx={{color:'white'}}/> :null }
                    </button>
                    <OrAuth name={"or login with"}/>
                    <a href="/register" className="text-center font-varela-round text-red-500 font-light text-[0.875rem] max-sm:text-[1rem]">
                        Dont't have account? <span className='text-blue-600 capitalize'>register</span>
                    </a>
                    <GoogleAuth/>
                </div>
            </form>
            {/* auth alert success */}
            {
                state.isSuccess &&
                <AuthSuccess message={state.data.message} state={state.isSuccess}/>
            }
        </div>
  )
}

export default Login
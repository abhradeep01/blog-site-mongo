import React from 'react'
import { SendIcon } from '../../utilities/icons'
import AuthAlert from '../../components/auth/AuthAlert';
import AuthSuccess from '../../components/auth/AuthSuccess';
import InputBox from '../../components/auth/InputBox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import { resend, verify } from '../../redux/auth/authService';
import useLocalstorage from '../../hooks/useLocalstorage';
import { reSet } from '../../redux/auth/authSlice';


function VerifyIdentity() {
    //otp
    const [otp,setOtp] = React.useState('');
    //navigate
    const navigate = useNavigate();
    //dispatch 
    const dispatch = useDispatch();
    //selector
    const state = useSelector((state)=>state.auth);
    //get auth
    const {getAuth} = useLocalstorage;
    //email
    const email = React.useRef(getAuth('sended_email'));
    //useeffect
    React.useEffect(()=>{
        if(state.isSuccess){
            setTimeout(() => {
                navigate(state?.data?.route)
                dispatch(reSet());
            }, 1000);
        }
        if(state.isError){
            if(state.errorData?.statusCode===401){
                navigate(state.errorData?.route);
                dispatch(reSet());
            }
        }
        if(email.current===null){
            navigate('/login'); 
        }
    },[state.isSuccess,state.isError,navigate,email.current]);

    //onsubmit
    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(verify({otp}));
    }

    //resend otp
    const resendOtp = (e) =>{
        e.preventDefault();
        dispatch(resend())
    }
    console.log(state);
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col items-center">
        <h2 className="font-varelaround capitalize text-xl font-bold text-center mb-2.5">
            please check your email
        </h2>
        <p className="font-gothicregular text-[1rem] text-center font-light text-slate-600">
            we sent verification code to 
            <span className='font-extralight  max-lg:font-semibold text-blue-600 ml-1'>
                {email.current}
            </span>
        </p>
        <form className='w-full flex flex-col gap-4 mt-3' onSubmit={onSubmit} >
            <InputBox
                placeholder="enter 6 digit verification code"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                type='number'
                maxLength={6}
            />
            {
                state.isError && 
                <AuthAlert message={state.errorData?.message} state={state.isError}/>
            }
            <button type='submit' className='w-full bg-black text-white py-1.5 rounded capitalize font-sen hover:opacity-90 flex items-center justify-center gap-2 hover:cursor-pointer'>
                verify {state.isLoading?<CircularProgress size={18} sx={{color:'white'}}/>:null}
            </button>
        </form>
        <p className="font-sen text-red-500 text-center mt-3">
            If you don't receive any verification code? 
        </p>
        <button onClick={resendOtp} className='bg-green-600 w-fit px-2 py-1 rounded font-sen text-white text-[1.05rem] mt-1 flex flex-row items-center hover:opacity-90 hover:cursor-pointer'>
            resend  {state.isLoading?<CircularProgress size={18}/>:<SendIcon className="size-5 ml-1.5"/>}
        </button>
        {
            state.isSuccess &&
            <AuthSuccess message={state.data?.message} state={state.isSuccess}/>
        }
    </div>
  )
}

export default VerifyIdentity
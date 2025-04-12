import React from 'react';
import InputBox from '../components/auth/InputBox';
import PasswordBox from '../components/auth/PasswordBox';
import { Button, FormControlLabel, Switch } from '@mui/material';
import GoogleAuth from '../components/auth/GoogleAuth';
import OrAuth from '../components/auth/OrAuth';

function Login() {
    //info 
    const [inputs,setInputs] = React.useState({
        type:"",
        password:""
    });
    //checked
    const [checked,setChecked] = React.useState(false);
    //loading
    const [loading,setLoading] = React.useState(false);

    //handle change
    const handleChange = (e) =>{
        e.preventDefault()
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    
    return (
        <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[99%] mobile:border-red-500 flex flex-col justify-center items-center shadow shadow-slate-200 bg-amber-200 rounded">
            <h2 className="text-center font-varelaround text-lg text-emerald-600 font-bold mb-4">LogIn</h2>
            <form className='w-full flex flex-col gap-[1.5rem]'>
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
                                <p className='text-[1.025rem] text-slate-700 font-gothicregular'>
                                    Remember Me
                                </p>
                            }
                        />
                        <a href="/forgetpassword" className='text-red-500 text-[0.95rem] font-medium font-gothicregular'>Forget Password?</a>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-[0.8rem]'>
                    <button className='w-full bg-blue-500 p-1.5 rounded shadow text-white font-sen font-light capitalize' >
                        login
                    </button>
                    <OrAuth name={"or login with"}/>
                    <a href="/register" className="text-center font-varelaround text-red-500 font-light text-[0.875rem] max-sm:text-[1rem]">
                        Dont't have account? <span className='text-blue-600 capitalize'>register</span>
                    </a>
                    <GoogleAuth/>
                </div>
            </form>
        </div>
  )
}

export default Login
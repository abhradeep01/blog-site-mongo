import React from 'react';
import InputBox from '../../components/auth/InputBox';
import PasswordBox from '../../components/auth/PasswordBox';
import OrAuth from '../../components/auth/OrAuth';
import GoogleAuth from '../../components/auth/GoogleAuth';
import { UploadIcon } from '../../utilities/icons';
import AuthAlert from '../../components/auth/AuthAlert';
import AuthSuccess from '../../components/auth/AuthSuccess';

function Register() {
    //response
    const [res,setRes] = React.useState({
        state:false,
        success:null,
        message:""
    })
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[99%] flex flex-col justify-center items-center shadow shadow-slate-200 bg-neutral-300 rounded">
        <h2 className="font-varelaround text-lg text-emerald-600 font-medium mb-4">Register</h2>
        <div className="w-full flex flex-row justify-between mb-3">
            <img src="https://blog.hootsuite.com/wp-content/uploads/2024/03/TikTok-algorithm-556x556.png" alt="" className='w-[28%] max-sm:w-[35%] aspect-square rounded-sm' />
            <div className="w-[55%] flex justify-center items-center">
                <button className='p-1.5 bg-green-600 rounded text-[0.95rem] shadow capitalize font-sen font-medium text-white flex flex-row items-center gap-1.5 hover:opacity-90 hover:cursor-pointer'>
                    upload image <span className=''> <UploadIcon/> </span>
                </button>
            </div>
        </div>
        <form className="w-full flex flex-col gap-[1.5rem] max-sm:gap-[1.25rem]">
            <InputBox placeholder="name" type="text"/>
            <InputBox placeholder="username" type="text"/>
            <InputBox placeholder="email" type="email"/>
            <div className='w-full'>
                <PasswordBox placeholder="password"/>
                <div className="w-full mt-1.5">
                    <a href="/login" className="text-center font-varelaround text-red-500 font-light text-[0.875rem] max-sm:text-[1rem]">
                        Already have an account? <span className='capitalize text-blue-500'>login</span>
                    </a>
                </div>
            </div>
            {
                res.success===false&&
                <AuthAlert message={res.message}/>
            }
            <div className='w-full flex flex-col gap-[0.8rem]'>
                <button className='w-full bg-blue-500 py-1.5 rounded shadow text-white font-sen font-light capitalize hover:cursor-pointer' >
                    register
                </button>
                <OrAuth name={"or register with"}/>
                <GoogleAuth/>
            </div>
        </form>
        {
            res.success===true &&
            <AuthSuccess message={res.message}/>
        }
    </div>
  )
}

export default Register
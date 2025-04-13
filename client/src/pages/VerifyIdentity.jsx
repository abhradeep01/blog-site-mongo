import React from 'react'
import InputBox from '../components/auth/InputBox'
import OrAuth from '../components/auth/OrAuth'
import { SendIcon } from '../utilities/icons'

function VerifyIdentity() {
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col items-center">
        <h2 className="font-ptsanscaption capitalize text-xl font-bold text-center mb-2.5">please check your email</h2>
        <p className="font-gothicregular text-[1rem] text-center font-light text-slate-600">we sent verification code to <span className='font-medium max-lg:font-semibold text-emerald-600'>example@gmail.com</span></p>
        <form className='w-full flex flex-col gap-4 mt-3' >
            <InputBox
                type="number"
                placeholder="enter 6 digit code"
            />
            <button className='bg-black text-white py-2 rounded-lg capitalize font-sen'>
                verify
            </button>
        </form>
        <p className="font-sen text-red-500 text-center mt-3">
            If you don't receive any verification code? 
        </p>
        <button className='bg-green-600 w-fit px-2 py-1 rounded font-sen text-white text-lg mt-1 flex flex-row items-center'>
            resend <SendIcon className="size-5 ml-1.5"/>
        </button>
    </div>
  )
}

export default VerifyIdentity
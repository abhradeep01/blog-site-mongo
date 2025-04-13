import React from 'react'
import InputBox from '../components/auth/InputBox'
import { SendIcon } from '../utilities/icons'

function ForgetPassword() {
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col items-center">
        <h2 className="font-ptsanscaption capitalize text-xl font-bold mb-1.5 text-left">
            forget password?
        </h2>
        <p className="font-gothicregular text-[1.05rem] font-light text-stone-600 text-center">
            Don't worry! It happens. Please enter the email associated with your account.
        </p>
        <form className="w-full mt-3">
            <InputBox type="email" placeholder="Enter your email address"/>
            <div className="w-full flex flex-row items-center justify-between">
                <button className='bg-black text-white capitalize mt-4 py-1.5 px-1 rounded font-sen w-fit flex items-center'>
                    send code <SendIcon className="size-4 ml-1"/>
                </button>
                <a href="/register" className='text-red-500 font-gothicregular'>
                    Doesn't have any account?
                </a>
            </div>
        </form>
    </div>
  )
}

export default ForgetPassword
import React from 'react'
import InputBox from '../components/auth/InputBox'
import PasswordBox from '../components/auth/PasswordBox'
import { ResetIcon } from '../utilities/icons'

function ChangePassword() {
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col ">
        <h2 className="font-ptsanscaption capitalize text-xl font-bold mb-1 text-left">
            reset password
        </h2>
        <p className="font-gothicregular text-[1.05rem] font-light text-stone-600">
            Please type something which you'll remember
        </p>
        <form className="flex flex-col gap-4 mt-2">
            <PasswordBox placeholder="new password"/>
            <PasswordBox placeholder="confirm password"/>
            <button className='bg-black text-white capitalize mt-1 py-1.5 px-1 rounded font-sen w-fit flex items-center'>
                reset password <span className='ml-1.5'><ResetIcon/></span>
            </button>
        </form>
    </div>
  )
}

export default ChangePassword
import React from 'react'

function ChangedPassword() {
    
  return (
    <div className={`w-[450px] mt-[1rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col justify-center gap-4 items-center h-[40vh]`}>
        <h2 className="font-ptsanscaption capitalize text-xl font-bold mb-1 text-left">
            password changed 
        </h2>
        <pre className="w-fit font-gothicregular text-[1.15rem] font-light text-stone-600">
            Your password has been changed successfully ✅
        </pre>    
        <button className='bg-black text-white capitalize py-2 px-2 rounded font-sen w-fit flex items-center mt-8'>
            <a href="/login">
                Back to login
            </a>
        </button>
    </div>
  )
}

export default ChangedPassword
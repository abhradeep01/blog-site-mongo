import React from 'react'
import { Google } from '../config/icons';

function GoogleAuth() {
  return (
    <div className="relative w-full h-fit shadow rounded-sm shadow-slate-300 hover:cursor-pointer"> 
      <div className="w-full h-fit py-1 text-center text-[0.95rem] font-normal">Continue with Google</div>
      <div className="absolute top-0 left-1 flex items-center bottom-0">
        <Google/>
      </div>
    </div>
  )
}

export default GoogleAuth;
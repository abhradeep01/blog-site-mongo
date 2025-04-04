import React from 'react'
import { EyeClose, EyeOpen } from '../config/icons';

function PasswordInput(props) {
    //password show or hide
    const [show,setShow] = React.useState(false);
  return (
    <div className="relative w-full h-fit ">
      <input type={show?"text":"password"} placeholder='Password' 
      className='w-full h-[2.25rem] p-1.5 rounded border border-gray-400 focus:outline-gray-800 focus:outline-none' {...props} />
      <div className="absolute w-fit top-0 bottom-0 right-1 flex items-center"onClick={()=>setShow(!show)}>
        {
          show?
          <EyeClose/>:
          <EyeOpen/>
        }
      </div>
    </div>
  )
}

export default PasswordInput
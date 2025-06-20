import React from 'react'
import { EyeClose, EyeOpen } from '../../utilities/icons'

function PasswordBox(props) {
    //password show
    const [show,setShow] = React.useState(false)
    
  return (
    <div className="relative w-full h-fit">
      <input type={show?"text":"password"} 
        className='focus:outline-none h-[2.15rem] max-sm:h-[2.75rem] w-full border border-slate-200 p-1.5 rounded-sm bg-white placeholder:font-didact-gothic placeholder:font-medium placeholder:text-base placeholder:capitalize' 
        {...props}
      />
      <div className="absolute right-2.5 top-0 bottom-0 w-fit h-full flex justify-center items-center" onClick={()=>setShow(!show)}>
        {
          show?
          <EyeClose/>:
          <EyeOpen/>
        }
      </div>
    </div>
  )
}

export default PasswordBox
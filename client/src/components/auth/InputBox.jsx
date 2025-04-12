import React from 'react'

function InputBox(props) {
  return (
    <input 
      type="text" 
      className='focus:outline-none h-[2.15rem] max-sm:h-[2.5rem] w-full border border-slate-200 p-1.5 rounded-sm bg-white placeholder:font-gothicregular placeholder:font-medium placeholder:text-base placeholder:capitalize' 
      {...props} 
    />
  )
}

export default InputBox
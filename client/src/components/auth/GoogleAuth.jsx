import React from 'react'
import { GoogleIcon } from '../../utilities/icons'

function GoogleAuth(props) {
  return (
    <button className='w-full flex flex-row items-center gap-2 capitalize text-base font-normal font-varelaround rounded bg-slate-100 justify-center p-1 shadow hover:cursor-pointer' {...props}>
        continue with google <GoogleIcon/>
    </button>
  )
}

export default GoogleAuth
import React from 'react'
import { GoogleIcon } from '../../utilities/icons'

function GoogleAuth(props) {
  return (
    <button className='w-fit flex flex-row items-center gap-2 capitalize text-base font-normal font-varelaround rounded bg-slate-100 justify-center py-1 shadow hover:cursor-pointer px-[2rem]' {...props}>
      continue with google <GoogleIcon/>
    </button>
  )
}

export default GoogleAuth
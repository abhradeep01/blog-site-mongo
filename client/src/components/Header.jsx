import React from 'react'
import { BlogSiteIcon } from '../utilities/icons'

function Header() {
  return (
    <div className="w-full flex flex-row items-center">
      <div className="w-[75%] max-sm:w-[70%]">
        <h2 className="font-sen font-medium text-2xl text-rose-600">
          "<span className='text-sky-600 font-medium text-2xl'>
            Unlocking knowledge and perspectives, one click and countless insights away.
          </span>"
        </h2>
      </div>
      {/* icon */}
      <div className="w-[25%] max-sm:w-[30%] flex flex-row justify-center">
        <BlogSiteIcon/>
      </div>
    </div>
  )
}

export default Header
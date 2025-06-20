import React from 'react'
import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="mt-[4rem] h-[70vh] w-full flex items-center justify-center">
        <ClipLoader />
    </div>
  )
}

export default Loader
import React from 'react'
import { AlertIcon } from '../../utilities/icons';
import PropTypes from 'prop-types';

function AuthAlert({message,state}) {
  return (
    <div className={state?"w-full flex flex-row justify-between items-center border p-1.5 rounded border-red-400 bg-rose-50 my-1.5":'hidden'}>
      <span className='text-red-950 font-sen font-extralight text-[0.85rem]'>
        {message}
      </span>
      <AlertIcon className="text-red-500 size-6"/>
    </div>
  )
}

export default AuthAlert

AuthAlert.propTypes = {
  message: PropTypes.string.isRequired,
  state:PropTypes.bool.isRequired
}
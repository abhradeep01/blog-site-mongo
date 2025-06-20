import React from 'react'
import { SuccessIcon } from '../../utilities/icons';
import PropTypes from 'prop-types';

function AuthSuccess({message,state}) {
  return (
    <div className={state?"w-full flex flex-row justify-between items-center border mt-3.5 p-1 rounded border-green-400 bg-green-50":"hidden"}>
      <span className="text-emerald-800 font-sen text-[0.85rem]">
        {message}
      </span>
      <SuccessIcon />
    </div>
  )
}

export default AuthSuccess

AuthSuccess.propTypes = {
  message: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired
}
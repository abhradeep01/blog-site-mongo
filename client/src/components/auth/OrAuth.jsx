import React from 'react';
import PropTypes from 'prop-types'

function OrAuth({name}) {
  return (
    <div className="w-full flex flex-row justify-between items-center text-[0.925rem] font-medium font-varelaround capitalize">
        <hr className='w-[32%]'/>{name}<hr className='w-[32%]' />
    </div>
  )
}

export default OrAuth;

OrAuth.propTypes = {
    name: PropTypes.string.isRequired
}
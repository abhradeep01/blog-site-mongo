import { OutlinedInput } from '@mui/material';
import React from 'react'

function InputBox(props) {
  return (
    <OutlinedInput
      type='text'
      sx={{width:'100%',height:'2.15rem'}}
      {...props}
    />
  )
}

export default InputBox;
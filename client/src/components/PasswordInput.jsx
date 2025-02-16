import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import React from 'react'

function PasswordInput(props) {
    //password show or hide
    const [show,setShow] = React.useState(false);
  return (
    <OutlinedInput
        type={show?'text':'password'} sx={{width:'100%',height:'2.15rem'}} inputProps={{minLength:6}}
        endAdornment={
            <InputAdornment position='end'>
                <IconButton size='small' onClick={()=>setShow(!show)}>
                    {
                        show?
                        <VisibilityOff fontSize='small' htmlColor='black'/>:
                        <Visibility fontSize='small' htmlColor='black'/>
                    }
                </IconButton>
            </InputAdornment>
        }
        {...props}
    />
  )
}

export default PasswordInput
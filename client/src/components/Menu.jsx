import { Button, IconButton } from '@mui/material';
import React from 'react';
import {Close, Login, Logout, Menu} from '@mui/icons-material'
import { navs } from '../config/assets';

function MenuBar() {
    //open menu
    const [open,setOpen] = React.useState(false);
  return (
    <div className="hidden max-lg:inline ">
      <IconButton onClick={()=>setOpen(true)} size='small' >
        <Menu fontSize='medium' sx={{color:'black'}}/>
      </IconButton>
      <div className={open?'bg-slate-100 absolute z-[4] top-0 right-[0] left-0 transition-all ease-in-out w-[100vw] h-[100vh] flex flex-col gap-2 justify-center items-center':'hidden'}>
        <IconButton onClick={()=>setOpen(false)} sx={{position:'fixed',top:'2vw',left:'2vw'}}>
          <Close fontSize='medium' htmlColor='black'/>
        </IconButton>
        {
          navs.map(nav=>(
            <a key={nav.text} href={nav.path} className='capitalize text-base'>{nav.text}</a>
          ))
        }
        <Button size='small' variant='contained' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Login fontSize='small'/>}>
          login
        </Button>
        <Button size='small' variant='contained' color='error' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Logout fontSize='small'/>}>
          logout
        </Button>
      </div>
    </div>
  )
}

export default MenuBar
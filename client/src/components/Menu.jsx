import { Button, IconButton } from '@mui/material';
import React from 'react';
import { Login, Logout } from '@mui/icons-material'
import { navs } from '../config/assets';
import { CloseBtn, MenuIcon } from '../config/icons';

function MenuBar() {
    //open menu
    const [open,setOpen] = React.useState(false);
    //current user
    var currentuser = React.useRef(JSON.parse(localStorage.getItem('currentuser'))).current;
    
  return (
    <div className="hidden max-lg:inline">
      <IconButton onClick={()=>setOpen(true)} size='small' >
        <MenuIcon />
      </IconButton>
      <div className={open?'bg-slate-100 absolute z-[4] top-0 right-[0] left-0 transition-all ease-in-out w-[100vw] h-[100vh] flex flex-col gap-4 justify-center items-center':'hidden'}>
        <IconButton onClick={()=>setOpen(false)} sx={{position:'fixed',top:'2vw',right:'2vw'}}>
          <CloseBtn/>
        </IconButton>
        {
          navs.map(nav=>(
            <a key={nav.text} href={nav.path} className='capitalize text-base'>{nav.text}</a>
          ))
        }
        {
          currentuser?
          <>
            <div className='w-fit flex flex-col items-center'>
              <a href={`/profile/${currentuser.username}`} className='flex flex-col items-center'>
                <img src={currentuser.profileImg} alt="" className='w-[2.75rem] h-[2.75rem] rounded-full' />
                <p className="text-sm font-medium text-blue-600">{currentuser.username}</p>
              </a>
            </div>
            <Button size='small' variant='contained' color='error' sx={{fontSize:'0.75rem',fontWeight:'400',textTransform:'capitalize'}} endIcon={<Logout fontSize='small'/>}>
              logout
            </Button>:
          </>:
          <Button href='/login' size='small' variant='contained' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Login fontSize='small'/>}>
            login
          </Button>
        }
      </div>
    </div>
  )
}

export default MenuBar
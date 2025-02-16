import { Button, IconButton } from '@mui/material';
import { navs } from '../config/assets';
import {Login, Logout} from '@mui/icons-material';
import MenuBar from './Menu';

function NavBar() {

  return (
    <>
      <div className="fixed w-[100%] bg-purple-200 h-[4rem] z-[3] flex flex-row items-center justify-around max-lg:justify-between max-lg:px-[5vw] max-sm:px-1">
        <IconButton href='/' sx={{fontSize:'0.925rem',fontWeight:'600',color:'white'}} size='small'>
          <img src="https://i.postimg.cc/1X9xcsMQ/blogger-logo-1.png" alt="" className='w-[4.25rem]' />
        </IconButton>
        <div className="flex flex-row gap-4 items-center max-lg:hidden">
          {
            navs.map((nav,index)=>(
              <a key={index} href={nav.path} className='font-sans capitalize text-[0.9rem] font-normal'>
                {nav.text}
              </a>
            ))
          }
          <Button size='small' variant='contained' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Login fontSize='small'/>}>
            login
          </Button>
          <Button size='small' variant='contained' color='error' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Logout fontSize='small'/>}>
            logout
          </Button>
        </div>
        <MenuBar/>
      </div>
    </>
  )
}

export default NavBar
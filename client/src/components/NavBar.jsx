import { Button, IconButton } from '@mui/material';
import { navs } from '../config/assets';
import {Login, Logout} from '@mui/icons-material';
import MenuBar from './Menu';
import React from 'react';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';

function NavBar() {
  //current user 
  var currentuser = React.useRef(JSON.parse(localStorage.getItem('currentuser'))).current;

  //navigator
  const navigate = useNavigate();
  
  //logout
  const logout = async () =>{
    try {
      const response = await axiosClient.post('/auth/logout');
      if(response.status===200){
        localStorage.clear();
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return (
    <>
      <div className="fixed w-[100%] bg-purple-200 h-[4.5rem] z-[3] flex flex-row items-center justify-around max-lg:justify-between max-lg:px-[5vw] max-sm:px-1">
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
          {
            currentuser?
            <>
              <div className='w-fit flex flex-col items-center'>
                <a href={`/profile/${currentuser.username}`}>
                  <img src={currentuser.profileImg} alt="" className='w-[2.75rem] h-[2.75rem] rounded-full' />
                </a>
                <h3 className="text-sm font-medium text-red-500 capitalize m-0">{currentuser.username}</h3>
              </div>
              <Button onClick={logout} size='small' variant='contained' color='error' sx={{fontSize:'0.75rem',fontWeight:'400',textTransform:'capitalize'}} endIcon={<Logout fontSize='small'/>}>
                logout
              </Button>
            </>:
            <Button href='/login' size='small' variant='contained' sx={{fontSize:'0.75rem',fontWeight:'400'}} endIcon={<Login fontSize='small'/>}>
              login
            </Button>
          }
        </div>
        {/* menu bar for less than 1024 px sized device */}
        <>
          <MenuBar/>
        </>
      </div>
    </>
  )
}

export default NavBar
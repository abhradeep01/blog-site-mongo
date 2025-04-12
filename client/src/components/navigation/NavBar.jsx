import React from 'react'
import { navContent } from '../../utilities/content';
import { Button } from "@mui/material"
import { LoginIcon, LogoutIcon, UploadIcon } from '../../utilities/icons';  
import Menu from './Menu';
import useBreakPoint from '../../hooks/useBreakPoint';

function NavBar() {
  //width hook
  const { isDesktop, isLargeDesktop, isLaptop, isTab, isSmallTab, isPhone, width } = useBreakPoint();
  console.log(width);
  return (
    <div className='fixed top-0 right-0 left-0 z-[2] w-[100%] h-[4rem] bg-emerald-100 flex flex-row items-center justify-between px-[4%] max-sm:px-1.5'>
      {/* logo */}
      <a href="/">
        <div className="w-fit flex flex-row items-baseline gap-0.5">
          <div className="relative text-4xl h-[2.75rem] w-[2.75rem] flex justify-center items-center bg-amber-300 font-underdog rounded-2xl text-white font-extrabold">
            B
            <div className="absolute font-mono right-[-1.9rem] text-2xl font-bold text-green-600">
              log
            </div>
          </div>
        </div>
      </a>
      {
        (isLargeDesktop || isDesktop || isLaptop) &&
        <div className="flex flex-row gap-[1.25rem] max-lg:hidden">
          {
            navContent.map((nav,index)=>{
              return (
                <div key={index}>
                  <a href={nav.path()} className='capitalize text-[1.075rem] font-medium font-gothicregular'>{nav.text}</a>
                </div>
              )
            })
          }
          <Button href='/upload' variant='contained' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400'}} 
            endIcon={<UploadIcon className="-ml-1.5 text-white size-5"/>}
          >
            upload
          </Button>
          <Button href='/login' variant='contained' color='success' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400'}} 
            endIcon={<LoginIcon className="text-white size-5 -ml-1.5"/>}
          >
            login
          </Button>
          <Button color='error' variant='contained' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400'}}
            endIcon={<LogoutIcon className="size-5 -ml-1.5 text-white"/>}
          >
            logout
          </Button>
        </div>
      }
      {
        (isTab || isPhone || isSmallTab) &&
        <div className='hidden max-lg:flex max-lg:flex-row max-lg:items-center max-lg:gap-[0.75rem]'>
          <Button href='/upload' variant='contained' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400',fontSize:"0.9rem"}} 
            endIcon={<UploadIcon className="-ml-1.5 text-white size-5"/>}
          >
            upload
          </Button>
          <Menu/>
        </div>
      }
    </div>
  )
}

export default NavBar
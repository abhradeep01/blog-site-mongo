import React from 'react'
import { navContent } from '../../utilities/content';
import { Button } from "@mui/material"
import { LoginIcon, LogoutIcon, UploadIcon } from '../../utilities/icons';  
import Menu from './Menu';
import useBreakPoint from '../../hooks/useBreakPoint';

function NavBar() {
  //width hook
  const { isDesktop, isLargeDesktop, isLaptop, isTab, isSmallTab, isPhone } = useBreakPoint();

  console.log(isTab ,isPhone ,isSmallTab);
  return (
    <div className='fixed top-0 right-0 left-0 z-[2] w-[100%] h-[4rem] bg-emerald-100 flex flex-row items-center justify-between px-[4%] max-sm:px-1.5'>
      {/* logo */}
      <a href="/">
        <div className="w-fit flex flex-row items-baseline gap-0.5">
          <div className="text-[1.8rem] flex justify-center items-center bg-amber-200 font-underdog text-black font-extrabold" style={{width:"5rem",height:"2.5rem",borderRadius:"50%"}}>
            B.
          </div>
          <div className="font-mono -ml-[1.5rem] text-2xl font-bold text-emerald-600">
            log
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
          <button className='bg-sky-600 px-1.5 py-0.5 rounded font-varelaround font-medium'>
            <a href="/upload" className='flex flex-row items-center text-[1rem] capitalize text-white'>
              upload <UploadIcon className="text-white size-4 ml-1.5"/>
            </a>
          </button>
          <button className='bg-emerald-600 px-1.5 py-0.5 rounded font-varelaround font-medium'>
            <a href="/upload" className='flex flex-row items-center text-[1rem] capitalize text-white'>
              login <LoginIcon className="text-white size-4 ml-1.5"/>
            </a>
          </button>
          <button className='bg-red-500 px-1.5 py-0.5 rounded font-varelaround font-medium'>
            <a href="/upload" className='flex flex-row items-center text-[1rem] capitalize text-white'>
              logout <LogoutIcon className="text-white size-4 ml-1.5"/>
            </a>
          </button>
        </div>
      }
      {
        (isTab || isPhone || isSmallTab) &&
        <div className='flex flex-row items-center gap-[0.75rem]'>
          <button className='bg-sky-600 px-1.5 py-0.5 rounded font-varelaround font-medium'>
            <a href="/upload" className='flex flex-row items-center text-[0.925rem] capitalize text-white'>
              upload <UploadIcon className="text-white size-5 ml-1.5"/>
            </a>
          </button>
          <Menu/>
        </div>
      }
    </div>
  )
}

export default NavBar
import React from 'react'
import { navContent } from '../../utilities/content';
import { Button } from "@mui/material"
import { BlogSiteIcon, LoginIcon, LogoutIcon, UploadIcon } from '../../utilities/icons';  
import Menu from './Menu';
import useBreakPoint from '../../hooks/useBreakPoint';
import useLocalstorage from '../../hooks/useLocalstorage';
import NavProfile from './NavProfile';

function NavBar() {
  //width hook
  const { isDesktop, isLargeDesktop, isLaptop, isTab, isSmallTab, isPhone } = useBreakPoint();
  //user
  const {getAuth} = useLocalstorage;
  //user
  const user = React.useRef(getAuth('currentuser')).current;
  

  return (
    <div className='fixed top-0 right-0 left-0 z-[2] w-[100%] h-[5rem] max-lg:h-[4rem] bg-emerald-100 flex flex-row items-center justify-between px-[4%] max-sm:px-1.5'>
      {/* logo */}
      <a href="/">
        <BlogSiteIcon/>
      </a>
      {
        (isLargeDesktop || isDesktop || isLaptop) &&
        <div className="flex flex-row items-center gap-[1.25rem] max-lg:hidden">
          {
            navContent.map((nav,index)=>{
              return (
                <div key={index}>
                  <a href={nav.path()} className='capitalize text-[1.1rem] font-light font-varta'>{nav.text}</a>
                </div>
              )
            })
          }
          <button className='bg-sky-600 px-1.5 py-0.5 rounded font-cascadia-mono font-light hover:cursor-pointer'>
            <a href="/upload" className='flex flex-row items-center text-[1rem] capitalize text-white'>
              upload <UploadIcon className="text-white size-4 ml-1.5"/>
            </a>
          </button>
          {
            user?
            <>
              <button className='bg-red-500 px-1.5 py-0.5 rounded font-cascadia-mono font-light flex flex-row items-center text-[1rem] capitalize text-white hover:cursor-pointer'>
                logout <LogoutIcon className="text-white size-4 ml-1.5"/>
              </button>
              <NavProfile
                key={user.username}
                name={user.username}
                img={user.profileImg}
              />
            </>:
            <button className='bg-emerald-600 px-1.5 py-0.5 rounded font-cascadia-mono font-light hover:cursor-pointer'>
              <a href="/login" className='flex flex-row items-center text-[1rem] capitalize text-white'>
                login <LoginIcon className="text-white size-4 ml-1.5"/>
              </a>
            </button>
          }
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
import { FormControlLabel, IconButton, Switch } from '@mui/material'
import React from 'react'
import { LoginIcon, LogoutIcon, MenuIcon, RemoveIcon } from '../../utilities/icons'
import { navContent } from '../../utilities/content';
import useTheme from '../../hooks/useTheme';
import useLocalstorage from '../../hooks/useLocalstorage';
import NavProfile from './NavProfile';

function Menu() {
    //show menu
    const [show,setMenu] = React.useState(false);
    //theme
    const { dark, toggleTheme } = useTheme();
    //auth
    const {getAuth} = useLocalstorage;
    // user
    const user = React.useRef(getAuth('currentuser')).current;

  return (
    <>
        <IconButton size='small' onClick={()=>setMenu(true)}>
            <MenuIcon/>
        </IconButton>
        <div className=
            {
                show?
                "fixed z-[6] bottom-0 right-0 left-0 top-0 bg-neutral-100 w-[100vw] h-[100vh] transition-all ease-in-out":
                "hidden"
            }
        >   
            <IconButton sx={{position:'fixed',top:'0.25rem',right:"0.25rem"}} onClick={()=>setMenu(false)}>
                <RemoveIcon className="size-7 text-slate-600"/>
            </IconButton>
            <div className="w-full h-[100vh] flex flex-col gap-4 justify-center items-center">
                {
                    navContent.map((nav,index)=>{
                        return (
                            <div key={index}>
                                <a href={nav.path()} className='font-varta text-[1.1rem] capitalize font-light'>
                                    {nav.text}
                                </a>
                            </div>
                        )
                    })
                }
                <FormControlLabel
                    sx={{display:"flex",flexDirection:"row",alignItems:"center"}}
                    control={
                        <Switch
                            onChange={toggleTheme}
                        />
                    }
                    label={
                        <p className="text-[1.1rem] font-varta font-light capitalize">
                            {dark?"dark mode":"light mode"}
                        </p>
                    }
                />
                {
                    user?
                    <>
                        <button className='bg-red-500 px-1.5 py-0.5 rounded font-varelaround font-medium flex flex-row items-center text-[0.925rem] capitalize text-white'>
                            logout <LogoutIcon className="text-white size-5 ml-1.5"/>
                        </button>
                        <NavProfile
                            key={user.username}
                            img={user.profileImg}
                            name={user.username}
                        />
                    </>
                    :
                    <button className='bg-emerald-600 px-1.5 py-0.5 rounded font-varelaround font-medium'>
                        <a href="/login" className='flex flex-row items-center text-[0.925rem] capitalize text-white'>
                          login <LoginIcon className="text-white size-5 ml-1.5"/>
                        </a>
                    </button>
                }
            </div>
        </div>
    </>
  )
}

export default Menu;
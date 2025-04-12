import { Button, FormControlLabel, IconButton, Switch } from '@mui/material'
import React from 'react'
import { LoginIcon, LogoutIcon, MenuIcon, RemoveIcon } from '../../utilities/icons'
import { navContent } from '../../utilities/content';

function Menu() {
    //show menu
    const [show,setMenu] = React.useState(false);
    //theme change
    const [dark,setDark] = React.useState(false);

  return (
    <>
        <IconButton size='small' onClick={()=>setMenu(true)}>
            <MenuIcon/>
        </IconButton>
        <div className={show?"fixed z-[6] bottom-0 right-0 left-0 top-0 bg-neutral-100 w-[100vw] h-[100vh] transition-all ease-in-out":"hidden"}>
            <IconButton sx={{position:'fixed',top:'0.25rem',right:"0.25rem"}} onClick={()=>setMenu(false)}>
                <RemoveIcon className="size-7 text-slate-600"/>
            </IconButton>
            <div className="w-full h-[80vh] flex flex-col gap-4 justify-center items-center">
                {
                    navContent.map((nav,index)=>{
                        return (
                            <div key={index}>
                                <a href={nav.path()} className='font-gothicregular text-[1.1rem] capitalize font-medium'>
                                    {nav.text}
                                </a>
                            </div>
                        )
                    })
                }
                <FormControlLabel
                    control={
                        <Switch
                            onChange={()=>setDark(!dark)}
                        />
                    }
                    label={
                        <p className="text-base font-gothicregular capitalize">
                            {dark?"dark mode":"light mode"}
                        </p>
                    }
                    sx={{display:"flex",flexDirection:"row",alignItems:"center"}}
                />
                <Button href='/login' variant='contained' color='success' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400',fontSize:"0.9rem"}} 
                    endIcon={<LoginIcon className="text-white size-5 -ml-1.5"/>}
                >
                  login
                </Button>
                <Button color='error' variant='contained' size='small' sx={{height:"fit-content",textTransform:'capitalize',fontWeight:'400',fontSize:"0.9rem"}}
                  endIcon={<LogoutIcon className="size-5 -ml-1.5 text-white"/>}
                >
                  logout
                </Button>
            </div>
        </div>
    </>
  )
}

export default Menu;
import React from 'react'
import { IconButton } from '@mui/material'
import { RemoveIcon, SearchIcon } from '../utilities/icons'
import InputBox from './auth/InputBox'

function SearchBar() {
    //search bar 
    const [searchOpen,setSearchOpen] = React.useState(false)
  return (
    <>
        <IconButton size='small' onClick={()=>setSearchOpen(!searchOpen)}>
            <SearchIcon className="text-slate-800 size-6"/>
        </IconButton>
        <div className={searchOpen?
            "fixed top-1.5 z-[3] w-full transition-all ease-in-out flex flex-row justify-center":
            "hidden"}
        >
            <div className="w-[600px] max-sm:w-[97%] bg-stone-200 rounded-lg p-1.5 flex flex-row justify-around shadow">
                <div className="w-[90%]">
                    <InputBox placeholder="search what you want?"/>
                </div>
                <IconButton size='small'onClick={()=>setSearchOpen(false)}>
                    <RemoveIcon/>
                </IconButton>
            </div>
        </div>
    </>
  )
}

export default SearchBar
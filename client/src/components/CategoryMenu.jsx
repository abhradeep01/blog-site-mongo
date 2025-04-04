import { IconButton } from '@mui/material';
import React from 'react'
import { categories } from '../config/assets';
import { CategoryIcon, CloseBtn } from '../config/icons';

function CategoryMenu() {
    //category menu show 
    const [show,setShow] = React.useState(false);

  return (
    <div className="hidden max-lg:inline">
        <IconButton size='small' onClick={()=>setShow(!show)}>
            <CategoryIcon />
        </IconButton>
        <div className={show?"fixed w-[40%] max-sm:w-[60%] h-[100vh] flex flex-col gap-[1rem] z-[4] left-0 top-0 bottom-0 bg-white pl-[1rem] pt-[0.25rem] pr-[0.5rem] transition-all ease-in-out":"hidden"}>
            <IconButton onClick={()=>setShow(false)} size='small' sx={{width:'2rem',alignSelf:'self-end'}}>
                <CloseBtn fontSize='medium'/>
            </IconButton>
            <div className="w-full flex flex-col">
                {
                    categories.map((item,index)=>{
                        return(
                            <div key={index} className='w-[100%] border-b border-stone-400 p-0.5' style={index===0?{borderTop:'solid 1px var(--color-stone-400)'}:null}>
                                <a  href={item.path()} className={'text-[0.9rem] font-normal capitalize'} onClick={()=>setShow(false)} >{item.text}</a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default CategoryMenu
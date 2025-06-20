import { IconButton } from '@mui/material'
import React from 'react'
import { CategoryIcon, RemoveIcon } from '../utilities/icons'
import { categories } from '../utilities/content';

function CategoriesMenu() {
  //open
  const [open,setOpen] = React.useState(false);

  return (
    <>
      <IconButton size='small' onClick={()=>setOpen(true)}>
        <CategoryIcon className="size-8 text-slate-900"/>
      </IconButton>
      <div className=
        {
          open?
          "fixed z-[3] bottom-0 left-0 top-0 w-[40%] max-sm:w-[75%] bg-neutral-100 p-2 transition-all ease-in-out flex flex-col gap-4":
          "hidden"
        }
      >
        <div className="w-full flex flex-row items-center justify-between">
          <p className="font-sen capitalize font-medium text-[1.3rem]">
            category
          </p>
          <IconButton size='small' onClick={()=>setOpen(false)}>
            <RemoveIcon/>
          </IconButton>
        </div>
        <div className="w-full flex flex-col">
          {
            categories.map((cat,index)=>(
              <div className={`w-full border-b border-neutral-400 py-1`} key={index}>
                <a href={cat.path()} className='text-[1rem] capitalize font-varta font-light'>
                  {cat.text}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default CategoriesMenu
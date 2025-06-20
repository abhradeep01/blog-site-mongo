import React from 'react'
import CategoriesMenu from './CategoriesMenu'
import SearchBar from './SearchBar'
import useBreakPoint from '../hooks/useBreakPoint'
import { categories } from '../utilities/content';

function Category() {
    //breakpoints
    const {isTab, isSmallTab, isPhone, isDesktop, isLaptop, isLargeDesktop} = useBreakPoint();
    
  return (
    <div className="w-full flex flex-row items-center justify-around p-1 rounded-full bg-orange-100 ">
        { 
            (isTab || isSmallTab || isPhone) &&
            <>
                <CategoriesMenu/>
                <div className="border-r h-[1.3rem] border-slate-600"></div>
            </>
        }
        {
            (isDesktop || isLaptop || isLargeDesktop) &&
            <>
                {
                    categories.map((cat,index)=>(
                        <div className="w-fit p-0.5" key={index}>
                            <a href={cat.path()} className='text-[0.95rem] capitalize font-gothicregular font-extralight'>
                                {cat.text}
                            </a>
                        </div>
                    ))
                }
                <div className="border-r h-[1.3rem] border-slate-600"></div>
            </>
        }
        <SearchBar className="text-slate-900"/>
    </div>
  )
}

export default Category
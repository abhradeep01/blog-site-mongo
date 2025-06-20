import React from 'react'
import useLocalstorage from '../../hooks/useLocalstorage'

function SuggestPost({postid,userid,img,title,username,category}) {
    const {getAuth} = useLocalstorage;
    // current user
    const currentuser = getAuth('currentuser')
    console.log(currentuser);
  return (
    <a href={`/${postid}`} className='w-[40%] max-lg:w-[49%] max-md:w-[70%] max-sm:w-[100%]'>
        <div className="w-[100%] flex flex-col bg-emerald-200 p-1.5 rounded">
            <img src={img} alt={title} className='aspect-[4/3] rounded-sm'/>
            <h3 className="font-varela-round text-[0.9rem] capitalize font-medium mt-0.5">{title}</h3>
            <span className='font-didact-gothic mt-1 text-[0.85rem]'>
                Written 
                {username && <a href={username===currentuser?.username?`/profile`:`/user/${userid}`} className='text-blue-600'>{username===currentuser?.username?` by you`:` by ${username}`}</a>}
                {" on"} <a href={`/?cat=${category}`} className='text-blue-600'>{category}</a>
            </span>
        </div>
    </a>
  )
}

export default SuggestPost
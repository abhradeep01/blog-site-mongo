import React from 'react'

function NavProfile({name,img}) {
  return (
    <a href="/profile">
        <div className="w-[4rem] h-full flex flex-col items-center gap-0.5">
            <img loading='lazy' src={img} alt={'your-profile-image'} className='aspect-square w-[3rem] rounded-full object-contain' />
            <div>
                <h4 className="text-sm font-sen ">
                    {name}
                </h4>
            </div>
        </div>
    </a>
  )
}



export default NavProfile
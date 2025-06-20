import React from 'react'
import SuggestPost from './SuggestPost'

function Suggestions({heading,suggestions=[]}) {
  return (
    
    <div className="w-full flex flex-col gap-2.5">
        <h2 className="font-ar-one-sans capitalize font-semibold text-lg">{heading}</h2>
        <div className="w-full flex flex-row gap-x-4 max-lg:items-center max-sm:flex-col max-sm:gap-y-2.5">
            {
                suggestions.map((suggest,i)=>(
                    <SuggestPost
                        key={i}
                        postid={suggest._id}
                        img={suggest.img}
                        title={suggest.title}
                        category={suggest.category}
                        username={suggest.username}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Suggestions
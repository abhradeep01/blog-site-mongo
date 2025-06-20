import moment from 'moment'
import React from 'react'

function AdPost({category,img,title,update_date,id}) {
  return (
    <a href={`/${id}`} className='w-[60%] max-2xl:w-[70%] max-xl:w-[80%] max-sm:w-full'>
        <div className="w-[100%] h-[7rem] flex flex-row gap-2.5 p-1.5 bg-amber-100 shadow rounded">
            <img src={img} alt="" className='w-[175px] h-full rounded-md' />
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-3.5">
                    <h3 className="text-[0.9rem] capitalize font-sen text-blue-600">
                        {category}
                    </h3>
                    <h4 className="text-[0.9rem] font-gothicregular text-emerald-600">
                        {moment(update_date).fromNow()}
                    </h4>
                </div>
                <h2 className="capitalize font-montserrat text-[1.1rem] font-semibold">
                    {title}
                </h2>
            </div>
        </div>
    </a>
  )
}

export default AdPost
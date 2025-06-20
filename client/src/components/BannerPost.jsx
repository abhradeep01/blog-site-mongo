import React from 'react';
import moment from 'moment';

function BannerPost({category,img,title,update_date,id}) {
  return (
    <a href={`/${id}`}>
        <div className="w-full flex flex-col gap-2.5 p-1.5 bg-red-100 rounded-lg shadow">   
            <img src={img} alt="" className='w-full aspect-[3/2] object-cover rounded-lg' />
            <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-row items-center gap-2.5">
                    <h3 className="text-[0.9rem] capitalize font-sen text-blue-600">
                        {category}
                    </h3>
                    <h4 className="text-[0.9rem] font-gothicregular text-emerald-500">
                        {moment(update_date).fromNow()}
                    </h4>
                </div>
                <div className="w-full">
                    <h2 className="capitalize font-montserrat text-[1.1rem] font-semibold">
                        {title}
                    </h2>
                </div>
            </div>
        </div>
    </a>
  )
}

export default BannerPost
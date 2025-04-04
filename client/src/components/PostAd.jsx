import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

function PostAd({id,img,num,type,postdate,title}) {
  return (
    <a href={`/${id}`}>
      <div className="w-full flex flex-row gap-4 shadow shadow-slate-400 rounded p-1.5 bg-orange-50">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-[40%]">
          <img src={img} alt={title} className='w-full aspect-[16/9] object-cover rounded shadow border-white shadow-gray-400'/>
        </div>
        <div className="w-[70%] max-md:w-[55%] flex flex-col gap-1.5">    
          <div className="w-full flex flex-row items-center gap-4">
            <span className="text-[0.825rem] font-medium">{'0'+num}.</span>
            <span className='text-blue-600 text-[0.85rem] capitalize font-normal'>{type}</span>
            <span className="text-[0.825rem] font-normal text-zinc-500">{moment(postdate).fromNow()}</span>
          </div>
          <div className='m-0'>
              <h3 className="text-base capitalize font-semibold m-0">{title}</h3>
          </div>
        </div>
      </div>
    </a>
  )
}

PostAd.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  postdate: PropTypes.instanceOf(Date).isRequired
}

export default PostAd;
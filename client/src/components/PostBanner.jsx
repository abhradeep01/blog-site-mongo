import React from 'react'
import {PropTypes} from 'prop-types';
import moment from 'moment'
function PostBanner({id,img,type,postdate,title,num}) {
    
  return (
    <a href={`/${id}`}>
      <div className="w-full flex flex-col items-center gap-0.5 p-2 shadow shadow-slate-400 rounded bg-rose-200">
        <img src={img} alt={title} className='w-full rounded-md shadow shadow-gray-400'/>
        <div className="w-full flex flex-row items-center gap-3">
          <span className="text-sm font-medium">{'0'+num}.</span>
          <span className='text-blue-600 text-sm capitalize font-normal'>{type}</span>
          <span className="text-[0.85rem] font-normal text-zinc-500">{moment(postdate).fromNow()}</span>
        </div>
        <div className='w-full'>
          <h3 className="text-xl capitalize font-bold font-mono m-0">{title}</h3>
        </div>
      </div>
    </a>
  )
}

PostBanner.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  num: PropTypes.number,
  postdate: PropTypes.date,
}

export default PostBanner
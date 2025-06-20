import React from 'react'
import BannerPost from './BannerPost'

function Banners({data=[]}) {
  return (
    <>
        {
            data.map(banner=>{
                return(
                    <BannerPost
                        key={banner._id}
                        id={banner._id}
                        category={banner.category}
                        img={banner.img}
                        title={banner.title}
                        update_date={banner.updatedAt}
                    />
                )
            })
        }
    </>
  )
}

export default Banners
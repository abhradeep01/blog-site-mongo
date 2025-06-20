import React from 'react'
import AdPost from './AdPost';

function Ads({data=[]}) {
    
  return (
    <>
       {
        data.map(ad=>{
            return(
                <AdPost
                    key={ad._id}
                    id={ad._id}
                    category={ad.category}
                    img={ad.img}
                    title={ad.title}
                    update_date={ad.updated_date}
                />
            )
        })
       }
    </>
  )
}

export default Ads
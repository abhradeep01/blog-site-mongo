import React from 'react'

function PageSave({id}) {
    // bookmarked
    const [bookmarked,setBookmarked] = React.useState(false);

  return (
    <button className="w-full flex flex-row items-center gap-1 text-[0.975rem] font-medium" onClick={()=>setBookmarked(!bookmarked)}>
        <span>
            {
                bookmarked?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='text-neutral-800'>
                    <path fill="currentColor" d="M6 19.5V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616V19.5l-6-2.577z"/>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='text-neutral-600'>
                    <path fill="currentColor" d="M6 19.5V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616V19.5l-6-2.577zm1-1.55l5-2.15l5 2.15V5.616q0-.231-.192-.424T16.384 5H7.616q-.231 0-.424.192T7 5.616zM7 5h10z"/>
                </svg>
            }
        </span>
        <span className='text-neutral-800 font-comic-neue'>
            {
                bookmarked?
                "bookmarked":
                "unbookmarked"
            }
        </span>
    </button>
  )
}

export default PageSave
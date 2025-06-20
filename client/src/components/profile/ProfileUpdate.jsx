import React from 'react'
import InputBox from '../auth/InputBox';

function ProfileUpdate() {
    // open 
    const [open,setOpen] = React.useState(false);
  return (
    <>
        <button className="bg-neutral-200 w-fit p-1 rounded font-sen text-[0.9rem] text-emerald-600 font-medium flex flex-row gap-1 hover:cursor-pointer" onClick={()=>setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 9.5c0-.148.094-.636.388-1.32a8.6 8.6 0 0 1 1.42-2.23c1.35-1.52 3.59-2.96 7.19-2.96c3.57 0 5.81 1.66 7.18 3.32a10.7 10.7 0 0 1 1.609 2.683h-5.29a.5.5 0 0 0 0 1h5.99a.5.5 0 0 0 .41-.199a.5.5 0 0 0 .102-.312v-5.99a.5.5 0 0 0-1 0v3.7a11.5 11.5 0 0 0-1.05-1.51c-1.51-1.84-4.02-3.68-7.95-3.68c-3.9 0-6.41 1.57-7.94 3.29a9.5 9.5 0 0 0-1.59 2.49c-.315.726-.471 1.36-.471 1.71a.5.5 0 0 0 1 0zm17.6 6.3c.295-.68.388-1.17.388-1.32a.5.5 0 0 1 1 0c0 .352-.156.988-.471 1.71a9.4 9.4 0 0 1-1.59 2.49c-1.53 1.73-4.03 3.29-7.94 3.29c-3.93 0-6.44-1.84-7.95-3.68a12 12 0 0 1-1.05-1.51v3.7a.5.5 0 0 1-1 0v-5.99a.504.504 0 0 1 .431-.507l.081-.005h5.99a.5.5 0 0 1 0 1h-5.29q.072.174.169.383c.292.628.755 1.46 1.44 2.3c1.36 1.66 3.61 3.32 7.18 3.32c3.6 0 5.84-1.43 7.19-2.96a8.3 8.3 0 0 0 1.42-2.23z"/>
            </svg>Profile Update
        </button>
        {
            open && 
            <div className="fixed w-[500px] h-fit bg-gray-100 rounded-lg shadow p-3">
                <div className="w-full flex flex-col gap-2">
                    <InputBox placeholder='username'/>
                    <InputBox placeholder='name'/>
                    <textarea name="" id="" className='w-full h-[5rem] bg-white resize-none rounded-sm placeholder:font-didact-gothic p-1.5 focus:outline-none' placeholder='bio'></textarea>
                </div>
                <div className="w-fit justify-self-end flex flex-row gap-1.5 mt-3.5">
                    <button className='bg-emerald-600 text-white p-0.5 font-pt-sans-caption text-[0.9rem]  rounded-sm'>
                        Update
                    </button>
                    <button className='bg-rose-700 text-white p-0.5 font-pt-sans-caption text-[0.9rem] rounded-sm hover:cursor-pointer' onClick={()=>setOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        }
    </>
  )
}

export default ProfileUpdate
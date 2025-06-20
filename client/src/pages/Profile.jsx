import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getprofile } from '../redux/profile/profileService';
import ProfileUpdate from '../components/profile/ProfileUpdate';

function Profile() {
    // dispatch 
    const dispatch = useDispatch();
    // selectpor
    const state = useSelector(state=>state.profile);

    React.useEffect(()=>{
        dispatch(getprofile())
    },[])

    console.log(state);

  return (
    <div className="mt-[5.25rem] max-lg:mt-[4.25rem] w-[1500px] max-2xl:w-[1200px] max-xl:w-[1000px] max-lg:w-[90%] max-md:w-[95%] max-sm:w-[97%] flex flex-col gap-5">
      {/* profile header */}
      <div className="w-full flex flex-row justify-around items-center">
        <div className="w-[15%] aspect-square">
          <img src={state?.data?.data?.img} alt="" className='aspect-square rounded-full' />
        </div>
        <div className="w-[30%] flex flex-col gap-1.5">
          <h3 className="font-ar-one-sans font-extralight text-[1rem] capitalize">{state?.data?.data?.name}</h3>
          <h5 className="text-neutral-700">{"@"+state?.data?.data?.username}</h5>
          <p className="w-full h-[5rem] rounded shadow-neutral-600 p-1 text-neutral-600 bg-slate-200">
            {state?.data?.data?.bio||"bio!"}
          </p>
          <ProfileUpdate/>
        </div>
      </div>
      {/* posts user */}
      
    </div>
  )
}

export default Profile
import React from 'react'
import Header from '../components/Header';
import Category from '../components/Category';
import Loader from '../components/UI/Loader';
import { posts } from '../redux/post/postService';
import {useSelector,useDispatch} from 'react-redux'
import { useLocation } from 'react-router';
import Banners from '../components/Banners';
import Ads from '../components/Ads';
import useBreakPoint from '../hooks/useBreakPoint';

function Home() {
  //dispatch redux
  const dispatch = useDispatch();
  //selector redux
  const state = useSelector((state)=>state.post);
  //navigate
  const location = useLocation();
  //use breakpoints
  const {isTab,isSmallTab,isPhone} = useBreakPoint()
  //useEffect
  React.useEffect(()=>{
    dispatch(posts({type:location.search?location.search.split('=')[1]:''}));
  },[location.search,dispatch]);

  console.log(state);


  return (
    <>
      {
        state?.isLoading === true?
        <Loader/>:
        <div className="mt-[5.25rem] max-lg:mt-[4.25rem] w-[1500px] max-2xl:w-[1200px] max-xl:w-[1000px] max-lg:w-[90%] max-md:w-[95%] max-sm:w-[97%] flex flex-col gap-5">
          {/* header */}
          <Header/> 
          {/* category section */}
          <Category/>
          {/* ads and banners */}
          <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-1.5 justify-between">
            <div className="w-[40%] max-lg:w-full p-1 max-sm:p-0">
              {/* banners */}
              <Banners
                data={state.data?.data?.banners}
              />
            </div>
            {/* ads for below 1024px screen */}
            {
              !(isTab || isSmallTab || isPhone ) &&
              <div className="w-[57.5%] max-sm:w-full flex flex-col items-center justify-between max-xl:gap-2">
                <Ads
                  data={state.data?.data?.ads}
                />
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Home;
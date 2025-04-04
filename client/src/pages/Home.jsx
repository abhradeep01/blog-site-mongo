import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router'
import { axiosClient } from '../config/axios'
import { categories } from '../config/assets';
import CategoryMenu from '../components/CategoryMenu';
import InputBox from '../components/InputBox';
import PostBanner from '../components/PostBanner';
import PostAd from '../components/PostAd';
import RecentPosts from '../components/RecentPosts';
import { SearchBtn } from '../config/icons';

function Home() {
  //navigation
  const navigation = useNavigate();
  //category
  const cat = useLocation().search;
  //posts
  const [data,setdata] = React.useState({
    ads:[],
    banners:[],
    posts:[]
  });
  //split
  const {ads,banners,posts} = data;

  //handle search
  const handleSearch = async (e) =>{
    e.preventDefault();
    console.log('search');
  }
  React.useEffect(()=>{
    const homeFetch = async () => {
      try {
        const res = await axiosClient.get(`/posts?${cat.toLowerCase()}`);
        if(res.status===200){
          setdata({...data,
            ads:res.data.data.ads,
            banners:res.data.data.banners,
            posts:res.data.data.posts
          });
        }else{
          localStorage.clear();
          navigation('/login');
        }
      } catch (error) {
        navigation('/login')
        console.log(error);
      }
    }
    homeFetch();
  },[cat,navigation])

  return (
    <div className='w-[85vw] max-lg:w-[90vw] max-md:w-[95vw] max-sm:w-[97vw] flex flex-col gap-[1.25rem] mt-[5rem]'>
      <Header/>
      {/* category section and search bar  */}
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-full flex flex-row justify-between max-lg:w-[70%] max-md:w-full items-center bg-white p-2 rounded-xl">
          <CategoryMenu/>
          {
            categories.map((item,index)=>{
              return (
                <a key={index} href={item.path()} className='text-[0.85rem] font-[400] capitalize max-lg:hidden'>
                  {item.text}
                </a>
              )
            })
          }
          <span className='border h-[1rem]'></span>
          <div className="w-[20%] h-fit relative max-lg:w-[80%]">
            <InputBox placeholder={'search a post'} className='w-full h-[2rem] focus:outline-none border border-gray-400 rounded p-1'/>
            <div className="absolute top-0 bottom-0 right-1 flex items-center" onClick={handleSearch}>
              <SearchBtn />
            </div>
          </div>
        </div>
        {/* ads and banner  */}
        <div className="w-full flex flex-row justify-around max-md:flex-col gap-2">
          <div className="w-[50%] max-lg:w-[50%] max-md:w-full">
            {
              banners.map((banner,index)=>{
                return (
                  <PostBanner
                    key={index}
                    num={index+1}
                    img={banner.img}
                    type={banner.category}
                    postdate={banner.updatedAt}
                    title={banner.title}
                    id={banner._id}
                  />
                )
              })  
            }
          </div>
          {/* ads */}
          <div className="w-[40%] max-lg:w-[48%] max-md:w-full flex flex-col gap-1.5 justify-between">
            {
              ads.map((ad,index)=>{
                return (
                  <PostAd
                    key={index}
                    id={ad._id}
                    img={ad.img}
                    num={1+index}
                    postdate={ad.updatedAt}
                    type={ad.category}
                    title={ad.title}
                  />
                )
              })
            }
          </div>
        </div>
        {/* recent posts  */}
        <RecentPosts
          allPosts={posts}
          type={cat.replace('%20'," ").split('=')[1]}
        />
      </div>
    </div>
  )
}

export default Home
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getPage} from '../redux/post/postService';
import { useLocation, useNavigate } from 'react-router';
import useLocalstorage from '../hooks/useLocalstorage';
import PageUser from '../components/page/PageUser';
import PageLike from '../components/page/PageLike';
import PageSave from '../components/page/PageSave';
import PageEdit from '../components/page/PageEdit';
import PageDelete from '../components/page/PageDelete';
import { categories } from '../utilities/content';
import Loader from '../components/UI/Loader';
import Suggestions from '../components/page/Suggestions';

function PostPage() {
    // dispatch 
    const dispatch = useDispatch();
    // selector
    const state = useSelector(state=>state.post);
    // location 
    const {pathname} = useLocation();
    // navigation
    const navigate = useNavigate();
    // data
    const data = state.data?.data
    // use localstorage
    const {getAuth} = useLocalstorage;
    // currentuser
    const currentuser = getAuth('currentuser');
    
    // useEffect
    React.useEffect(()=>{
        dispatch(getPage(pathname));
        if(state.errorData?.statusCode===401){
            navigate('/login');
        }
    },[dispatch,location.pathname]);
    console.log(state?.data?.data?.suggestions);

  return (
    <>
        {state.isLoading?
        <Loader/>:
        <div className='mt-[5.5rem] max-lg:mt-[4.25rem] w-[1500px] max-2xl:w-[1200px] max-xl:w-[1000px] max-lg:w-[90%] max-md:w-[95%] max-sm:w-[97%] flex flex-col gap-4'>
            {/* page header */}
            <div className="w-full flex flex-row justify-between max-md:flex-col max-md:gap-3">
                <div className="w-[55%] max-lg:w-[70%] flex flex-col gap-1.5 max-md:w-full">
                    <h2 className="capitalize font-ar-one-sans text-xl font-semibold">{data?.title}</h2>
                    <h6 className="font-pt-sans-caption text-[0.8rem] text-slate-500">Written
                        {data?.user && <a href={data?.user?.username===currentuser.username?'/profile':`/${data?.user?.username}`} className='text-base text-blue-600 font-medium'>
                            {" by"}{data?.user?.username===currentuser.username?" you ":" "+data?.user?.name+" "}
                        </a> }
                        {" on"} 
                        <a href={`?cat=${data?.category}`} className='text-base text-blue-600 font-medium'>
                            {" "+data?.category}
                        </a>
                    </h6>
                    <p className="font-didact-gothic text-slate-900 font-medium text-[1rem]">
                        {String(data?.description).split('.')[0]+"."}
                    </p>
                </div>
                <div className="w-[40%] max-lg:w-[30%] aspect-[16/9] max-md:w-full">
                    <img src={data?.img} alt={data?.title} className='w-full rounded-md' />
                </div>
            </div>
            {/* page description */}
            <div className="w-full flex flex-row justify-between max-md:flex-col">
                <div className="w-[77.5%] max-lg:w-[75%] max-md:w-full flex flex-col gap-3.5">
                    {
                        String(data?.description).split('.').map((text,i)=>(
                            <p key={i} className="w-full font-varta text-[1.1rem] font-light">
                                {text+"."}
                            </p>
                        ))
                    }
                    <Suggestions
                        heading={'related posts'}
                        suggestions={state?.data?.data?.suggestions}
                    />
                </div>
                <div className="w-[17.5%] max-lg:w-[23.5%] max-md:w-full p-0.5 flex flex-col gap-2 max-md:flex-row max-md:justify-around">
                    {/* owner */}
                    {data?.user && <PageUser
                        username={data?.user?.username}
                        img={data?.user?.img}
                    />}
                    {/* actions */}
                    <div className="w-full flex flex-col gap-0.5 max-md:w-fit max-md:justify-around">
                        <h3 className="font-varta font-semibold">Actions</h3>
                        <PageLike id={data?._id}/>
                        <PageSave id={data?._id}/>
                        {
                            currentuser.username === data?.user?.username?
                            <>
                                <PageEdit id={data?._id}/>
                                <PageDelete id={data?._id}/>
                            </>:
                            null
                        }
                    </div>
                    {/* categories */}
                    <div className="w-full flex flex-col gap-0.5 max-md:w-fit max-md:justify-around">
                        <h3 className="font-varta font-semibold mb-0.5">Categories</h3>
                        {
                            categories.map((nav,i)=>(
                                <a key={i} className='font-cycleregular capitalize text-[0.9rem] font-normal underline underline-offset-2 text-blue-600' href={nav.path()}>{nav.text}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>}
    </>
  )
}

export default PostPage
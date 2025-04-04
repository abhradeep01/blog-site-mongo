import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { axiosClient } from "../config/axios";
import EditProfile from "../components/EditProfile";
import ProfileSettings from "../components/ProfileSettings";
import { profileRoutes } from "../config/assets";

function Profile (){
    //loading
    const [loading,setLoading] = React.useState(false);
    //location
    const location = useLocation();
    const username = location.pathname.split('/')[2];
    
    //user data
    const [data,setData] = React.useState({});
    const {
        postcount,
        likedcount,
        bookmarkedcount,
        ...user
    } = data;
    //count
    const count = [postcount,bookmarkedcount,likedcount];
    //loading
    const [error,setError] = React.useState({
        statusCode:null,
        statusText:''
    });
    //navigate
    let navigate = useNavigate();


    //usr effect
    React.useEffect(()=>{
        //get user info
        const getUser = async () =>{
            try{
                setLoading(true);
                const response = await axiosClient.get(`/profile/${username}`);
                if(response.status===200){
                    setData(response.data.data);
                }else if(response.status===401){
                    localStorage.clear();
                    console.log('clear');
                    navigate('/login');
                }
            }catch(err){
                setError({
                    ...error,
                    statusCode: err.statusCode,
                    statusText: err.statusText
                });
                console.log(err);
                navigate('/login');
            }finally{
                setLoading(false);
            }
        }
        getUser();
    },[username,navigate,error])

    return (
        <>
            {
                loading?
                <div className="mt-[6rem]">loading</div>:
                <div className="w-[85vw] max-lg:w-[90vw] max-md:w-[95vw] max-sm:w-[97vw] mt-[5rem] flex flex-col gap-4">
                    <div className="w-full flex flex-row max-sm:flex-col gap-[1.5rem] max-sm:gap-y-1 items-center justify-around">
                        <div className="rounded-lg h-fit w-[15%] max-[1025px]:w-[22%] max-md:w-[30%] max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center">
                            <img src={user.img} alt="" className="rounded-lg w-full max-sm:w-[45%] aspect-square object-cover" />
                        </div>
                        <div className="w-[60%] max-lg:w-[70%] max-sm:w-full flex flex-col gap-3 justify-center">
                            <div className="flex flex-row gap-8 max-sm:gap-0 max-sm:justify-between items-center">
                                <div className="flex flex-col">
                                    <div>
                                        <h2 className="text-2xl font-normal">{user.name}</h2>
                                    </div>
                                    <div>
                                        <h6 className="italic text-base font-normal text-blue-600">@{user.username}</h6>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 h-fit">
                                    <EditProfile user={user}/>
                                    <ProfileSettings/>
                                </div>
                            </div>
                            <div className="w-full flex flex-row gap-4 justify-between">
                                <div className="flex flex-col gap-1.5 items-center">
                                    <h4 className="text-base font-light">
                                        {postcount}
                                    </h4>
                                    <h3 className="capitalize font-medium text-green-700 text-[0.95rem]">
                                        posted
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-1.5 items-center">
                                    <h4 className="text-base font-light">
                                        {likedcount}
                                    </h4>
                                    <h3 className="capitalize font-medium text-green-700 text-[0.95rem]">
                                        liked posts
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-1.5 items-center">
                                    <h4 className="text-base font-light">
                                        {bookmarkedcount}
                                    </h4>
                                    <h3 className="capitalize font-medium text-green-700 text-[0.95rem]">
                                        saved posts
                                    </h3>
                                </div>
                            </div>
                            <div className="border border-gray-400 rounded-sm h-[5rem] p-1">
                                <p className="text-base font-normal">
                                    {
                                        user.bio?
                                        user.bio:
                                        <span className=" text-slate-600 font-light">
                                            {"Bio wasn't set yet!"}
                                        </span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-around">
                        {
                            profileRoutes.map((route,index)=>{
                                const routecount = count[index]
                                return {
                                    ...route,
                                    routecount
                                }
                            }).map((route,index)=>{
                                return (
                                    <div className="w-[30%] capitalize border-b border-b-gray-400 text-center" key={index}>
                                        <a href={route.path()}>{route.text}<span className="text-sm text-rose-600 font-normal"> ({route.routecount})</span></a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Outlet/>
                </div>
            }
        </>
    )
}

export default Profile;
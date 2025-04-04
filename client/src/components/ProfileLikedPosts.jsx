import React from 'react'
import { axiosClient } from '../config/axios';
import { useLocation } from 'react-router';

function ProfileLikedPosts() {
    // //posts
    // const [posts,setPosts] = React.useState([]);
    // //loading
    // const [loading,setLoading] = React.useState(false)
    // //location 
    // const location = useLocation()
    // const username = location.pathname.split('/')[2];
    // //error
    // const [error,setError] = React.useState({
    //     statusCode:null,
    //     statusText:''
    // })

    // //useeffect
    // React.useEffect(()=>{
    //     const getUsersLikedPosts = async () =>{
    //         try {
    //             setLoading(true);
    //             const res = await axiosClient.get(`/profile/${username}/liked`);
    //             if(res.status===200){
    //                 setPosts(res.data.data);
    //             }else{
    //                 setError({
    //                     ...error,
    //                     statusCode: res.data.data.statusCode,
    //                     statusText: res.data.data.statusText
    //                 })
    //             }
    //         } catch (err) {
    //             setError({
    //                 ...error,
    //                 statusCode: err.statusCode,
    //                 statusText: err.message
    //             });
    //         }finally{
    //             setLoading(false);
    //         }
    //     }
    //     getUsersLikedPosts()
    // },[username]);

  return (
    <>
        {
            // loading?
            // <>loading</>:
            <div>ProfileLikedPosts</div>
        }
    </>
  )
}

export default ProfileLikedPosts;
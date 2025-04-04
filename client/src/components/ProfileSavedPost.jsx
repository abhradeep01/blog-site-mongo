import React from "react";
import { axiosClient } from "../config/axios";
import { useLocation } from "react-router";

function ProfileSavedPost (){
    // //posts
    // const [posts,setPosts] = React.useState([]);
    // //loading
    // const [loading,setLoading] = React.useState(false);
    // //location
    // const location = useLocation();
    // const username = location.pathname.split('/')[2];
    // //error 
    // const [error,setError] = React.useState({
    //     statusCode:null,
    //     statusText:''
    // });

    // //useeffect
    // React.useEffect(()=>{
    //     const getSavedPosts = async () =>{
    //         try{
    //             setLoading(true)
    //             const response = await axiosClient.get(`/profile/${username}/bookmarked`);
    //             if(response.status===200){
    //                 setPosts(response.data.data);
    //             }
    //         }catch(err){
    //             console.log(err);
    //         }finally{
    //             setLoading(false);
    //         }
    //     }
    //     getSavedPosts();
    // },[username])

    return(
        <>
            {
                // loading?
                // <div>loading</div>:
                <div>savedposts</div>
            }
        </>
    )
}

export default ProfileSavedPost;
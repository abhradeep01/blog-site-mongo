import React from "react";
import { useLocation } from "react-router";
import { axiosClient } from "../config/axios";

function ProfilePosts (){
    //posts
    const [posts,setPosts] = React.useState([]);
    //loading
    const [loading,setLoading] = React.useState(false);
    //location
    const location = useLocation();
    const username = location.pathname.split('/')[2];
    //error message
    const [error,setError] = React.useState({
        statusCode:null,
        statusText:''
    });

    //use effect
    React.useEffect(()=>{
        const getUserPosts = async () =>{
            try {
                setLoading(true);
                const res = await axiosClient.get(`/profile/${username}/posts`);
                if(res.status===200){
                    setPosts(res.data.data);
                }else{
                    setError({
                        ...error,
                        statusCode: res.data.data.statusCode,
                        statusText: res.data.data.statusText
                    });
                }
            } catch (err) {
                setError({
                    ...error,
                    statusCode:err.statusCode,
                    statusText:err.message
                })
            }finally{
                setLoading(false);
            }
        }
        getUserPosts();
    },[username]);

    return(
        <>
            {
                loading?
                <>loading</>:
                <>
                    {
                        posts.length===0?
                        "content not available":
                        "content"
                    }
                </>
            }
        </>
    )
}

export default ProfilePosts;
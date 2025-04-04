import React from 'react'
import { axiosClient } from '../config/axios';
import { useLocation, useNavigate } from 'react-router';
import Loader from '../components/Loader';
import PostPageActionBookmarked from '../components/PostPageActionBookmarked';
import PostPageActionsEdit from '../components/PostPageActionsEdit';
import PostPageActionsDelete from '../components/PostPageActionsDelete';
import PostPageActionliked from '../components/PostPageActionsLiked';
import { categories } from '../config/assets';
import SuggestPost from '../components/SuggestPost';
import PostPageActionComment from '../components/PostPageActionsComment';
import PostPageActionsShare from '../components/PostPageActionsShare';

function PostPage() {
  //post
  const [data,setData] = React.useState({
    user:{},
    post:{},
    suggestions:[]
  });
  //split
  const {user,suggestions,...post} = data;
  //loading
  const [loading,setLoading] = React.useState(false);
  //postid
  const location = useLocation();
  const postId = location.pathname.split('/')[1];
  console.log(location.pathname.split('/'));
  //navigation
  let navigate = useNavigate();
  //local user
  const currentuser = React.useRef(JSON.parse(localStorage.getItem('currentuser'))).current;

  //useEffect 
  React.useEffect(()=>{
    const getData = async () =>{
      try {
        setLoading(true);
        const response = await axiosClient.get(`/posts/${postId}`);
        if(response.status===200){
          const {user,suggestions,...post} = response.data.data;
          setData({
            ...data,
            post:post,
            user:user,
            suggestions:suggestions
          });
        }else if(response.status===401){
          console.log(response.data.data.statusText);
          localStorage.clear();
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    getData();
  },[postId]);

  return (
    <div className='mt-[5rem]'>
      {
        loading?
        <Loader/>:
        <>
          <div className="w-[85vw] flex flex-col gap-[1rem]  max-lg:w-[90vw] max-md:w-[95vw] max-sm:w-[97vw]">
            <div className="w-full flex flex-row justify-between max-lg:flex-col max-lg:gap-y-2">
              <div className="flex flex-col gap-3 w-[40%] max-lg:w-full">
                <div>
                  <h2 className="text-xl font-medium capitalize">{post.post.title}</h2>
                </div>
                <div>
                  <p className="text-[0.9rem] text-slate-500">
                    Written by <a href={`/profile/${user?.username}`} className='text-blue-600 text-[0.95rem] font-normal'>{user?.username===currentuser.username?"You":user?.username}</a> on 
                    <a href={`/?cat=${post.post.category}`} className='text-blue-600 text-[0.95rem] capitalize font-normal'> {post.post.category}</a>
                  </p>
                </div>
                <p className="text-[0.95rem] font-medium text-sky-600">{String(post.post.description).split('.')[0]}.</p>
              </div>
              <div className="w-[40%] max-lg:w-full">
                <img src={post.post.img} alt="" className='w-full aspect-[16/9] rounded' />
              </div>
            </div>
            <div className="w-full flex flex-row max-lg:flex-col justify-between">
              <div className="w-[75%] flex flex-col gap-y-2.5 max-lg:w-full">
                {String(post.post.description).split('.').map((desc,index)=>{
                  return (<p key={index} className="text-[1.12rem] font-[350]">
                    {desc}.
                  </p>)
                })}
              </div>
              <div className="w-[20%] flex flex-col gap-5 max-lg:flex-row max-lg:w-full max-lg:justify-between">
                {/* Author */}
                <div className="w-full flex flex-col gap-1.5 max-lg:w-fit max-lg:h-fit">
                  <div>
                    <h2 className="text-sm font-semibold">Author</h2>
                  </div>
                  <div>
                    <div className="w-full flex flex-row items-center gap-[0.75rem]">
                      <div className="w-[2.75rem] rounded-full">
                        <img src={user?.img} alt="" className='w-full object-cover aspect-square rounded-full' />
                      </div>
                      <a href={user?.username===currentuser.username?`/profile/${currentuser.username}`:`/users/${user?._id}`} 
                        className="capitalize text-[1rem] font-[400]">
                          {currentuser.username===user?.username?"you":user?.name}
                      </a>
                    </div>
                    <p className="text-[0.9rem] font-normal text-stone-500 my-0.5">
                      Bio
                    </p>
                  </div>
                </div>
                {/* actions */}
                <div className="w-full flex flex-col gap-1.5 max-lg:w-fit">
                  <div>
                    <h2 className="text-sm font-semibold capitalize font-sans">actions</h2>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <PostPageActionliked/>
                    <PostPageActionComment 
                      postname={post.post.title}
                      postId={post.post._id}
                    />
                    <PostPageActionsShare/>
                    {
                      currentuser.username===user?.username?
                      <>
                        <PostPageActionsEdit/>
                        <PostPageActionsDelete/>
                      </>:
                      <>
                        <PostPageActionBookmarked/>
                      </>
                    }
                  </div>
                </div>
                {/* categories */}
                <div className="w-full flex flex-col gap-2.5 max-lg:w-fit">
                  <div>
                    <h2 className="text-sm font-semibold capitalize font-sans">categories</h2>
                  </div>
                  <div className="flex flex-col gap-1">
                    {
                      categories.map((type,index)=>{
                        return(
                          <a key={index} href={`${type.path()}`} className='text-[0.9rem] font-light text-blue-700 underline underline-offset-[0.125rem]'>{type.text}</a>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row flex-wrap gap-y-2 justify-between">
              {
                suggestions.map((post,index)=>{
                  return (
                    <SuggestPost
                      key={index}
                      id={post._id}
                      title={post.title}
                      img={post.img}
                      category={post.category}
                      user={post.user}
                    />
                  )
                })
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default PostPage;
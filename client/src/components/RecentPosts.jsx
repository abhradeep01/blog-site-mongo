import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function RecentPosts({allPosts=Array(),type}) {
  return (
    <div className="w-full flex flex-col gap-4">
        <div>
            <h2 className="text-xl capitalize text-gray-600 font-semibold"><span className={"text-orange-700 underline-offset-[3px] underline"}>{type?type:'all'}</span> {type?' type':null} recent posts</h2>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
            {
                allPosts.map((post,index)=>{
                    return (
                        <Post
                            key={index}
                            id={post._id}
                            title={post.title}
                            describtion={post.description}
                            img={post.img}
                            likecount={post.liked}
                            bookmarkcount={post.bookmarked}
                            user={post.user}
                            type={post.category}
                            uploadDate={post.createdAt}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

RecentPosts.propTypes = {
    allPosts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default RecentPosts
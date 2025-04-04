import React from "react";
import PropTypes from 'prop-types'

function SuggestPost ({id,title,img,category,user}) {
    //local user
    const currentuser = React.useRef(JSON.parse(localStorage.getItem('currentuser'))).current;

    return (
        <>
            <div className="w-[24%] flex flex-col gap-3 p-1.5 shadow shadow-zinc-400 rounded bg-amber-100 max-lg:w-[30%] max-sm:w-[48%]">
                <div className="w-full">
                    <img src={img} alt={title} className="w-full aspect-[16/9] object-cover rounded"/>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <h4 className="text-[0.95rem] font-semibold capitalize">{title}</h4>
                    <a href={`/${id}`}>
                        <button className="bg-blue-500 text-[0.85rem] px-2 py-0.5 flex items-center rounded-sm text-white hover:cursor-pointer">
                            Read
                        </button>
                    </a>
                </div>
                <p className="text-[0.85rem] font-normal text-neutral-500">
                    Written by <span className="text-[0.9rem] text-blue-600">  
                        <a href={user?.username===currentuser.username?`/profile/${user?.username}`:`/users/${user?._id}`}>
                            {user?.username===currentuser.username?"You":user?.username}
                        </a>
                    </span> on <span className="text-[0.9rem] text-blue-600">
                        <a href={`/?cat=${category}`}>{category}</a>
                    </span>
                </p>
            </div>
        </>
    )
}

export default SuggestPost;

SuggestPost.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
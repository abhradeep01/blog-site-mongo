import React from "react";
import { CloseBtn, CommentIcon } from "../config/icons";
import { IconButton } from "@mui/material";
import PropsTypes from 'prop-types';

function PostPageActionComment ({postname,postId}) {
    //comment secttion open
    const [open,setopen] = React.useState(false);

    return (
        <>
            <button className="flex flex-row gap-1.5 items-center my-0.5 hover:cursor-pointer" onClick={()=>setopen(true)}>
                <div>
                    <CommentIcon className='size-5 text-gray-800'/>
                </div>
                <div>
                    <p className="text-[0.925rem] text-gray-900 font-light">Comments on this Post</p>
                </div>
            </button>
            <div className={open?`fixed flex flex-col justify-between top-[30vh] bottom-[30vh] right-[30vw] left-[30vw] max-lg:top-[35vh] max-lg:bottom-[35vh] max-md: max-sm: z-[4] transition-all ease-in-out bg-gray-200 rounded`:"hidden"}>
                <div className='w-full flex flex-row justify-between items-center border-b-[1px] border-b-slate-400 px-1'>
                    <div>
                        <p className="text-[0.9rem] text-sky-600 ">
                            {`${postname}`.charAt(0).toUpperCase()+`${postname}`.substring(1)+"'s"} Comment Section
                        </p>
                    </div>
                    <IconButton size='small' sx={{justifySelf:'self-end'}} onClick={()=>setopen(false)}>
                        <CloseBtn className='size-5 text-gray-900'/>
                    </IconButton>
                </div>
                <div className="text-center border-t border-t-slate-400 py-1">
                    <p className="text-sm text-red-600 font-[400]">For commenting on post <a href={`/${postId}`} className='text-sky-600 font-medium underline'>Visit</a></p>
                </div>
            </div>
        </>
    )
}

PostPageActionComment.propTypes = {
    postId: PropsTypes.string.isRequired,
    postname: PropsTypes.string.isRequired
}

export default PostPageActionComment;
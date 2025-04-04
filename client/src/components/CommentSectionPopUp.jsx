import { Badge, IconButton } from '@mui/material'
import React from 'react'
import { CloseBtn, CommentIcon } from '../config/icons';
import PropTypes from 'prop-types';

function CommentSectionPopUp({commentCount,postId,postname}) {
    //comment section popup open
    const [commentopen,setCommentopen] = React.useState(false);

    //all comments of post
    const getallcomments = async (e) =>{
        e.preventDefault();
        setCommentopen(true);
    }

    
  return (
    <div className="relative">
        <a href={`/${postId}/comments`}>
            <Badge badgeContent={commentCount} color='success' onClick={getallcomments} showZero>
                <CommentIcon className='size-6 text-sky-600'/> 
            </Badge>
        </a>
        <div className={commentopen?`fixed flex flex-col justify-between top-[30vh] bottom-[30vh] right-[30vw] left-[30vw] max-lg:top-[35vh] max-lg:bottom-[35vh] max-md: max-sm: z-[4] transition-all ease-in-out bg-gray-200 rounded`:"hidden"}>
            <div className='w-full flex flex-row justify-between items-center border-b-[1px] border-b-slate-400 px-1'>
                <div>
                    <p className="text-[0.9rem] text-sky-600 ">
                        {`${postname}`.charAt(0).toUpperCase()+`${postname}`.substring(1)+"'s"} Comment Section
                    </p>
                </div>
                <IconButton size='small' sx={{justifySelf:'self-end'}} onClick={()=>setCommentopen(false)}>
                    <CloseBtn className='size-5 text-gray-900'/>
                </IconButton>
            </div>
            <div className="text-center border-t border-t-slate-400 py-1">
                <p className="text-sm text-red-600 font-[400]">For commenting on post <a href={`/${postId}`} className='text-sky-600 font-medium underline'>Visit</a></p>
            </div>
        </div>
    </div>
  )
}

CommentSectionPopUp.propTypes = {
    commentCount: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    postname: PropTypes.string.isRequired
}

export default CommentSectionPopUp
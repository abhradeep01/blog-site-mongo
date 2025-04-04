import { Badge, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import {BookmarkedFilled, BookmarkedOutline, CloseBtn, LikeBtnFilled, LikeBtnOutlined, ShareBtn} from '../config/icons';
import PropTypes from 'prop-types';
import CommentSectionPopUp from './CommentSectionPopUp';
import moment from 'moment';
import ThreeDotMenu from './ThreeDotMenu';


function Post({id,img,likecount,bookmarkcount,title,describtion,user,type,uploadDate}) {
    //set like 
    const [like,setLike] = React.useState(false);
    //set bookmark
    const [bookmark,setBookmark] = React.useState(false);
    //retrive local user
    const currentuser = React.useRef(JSON.parse(localStorage.getItem('currentuser'))).current;
    // link copy 
    const [copied,setCopied] = React.useState(false);
    
    //link share
    const linkShare = async () =>{
        await navigator.clipboard.writeText(`${window.location.href}${id}`);
        setCopied(true)
    }
    //onclose click
    const oncloseClick = () =>{
        setCopied(false);
    }
    //actions 
    const action = (
        <IconButton size="small" onClick={oncloseClick}>
            <CloseBtn className='text-white size-5'/>
        </IconButton>
    )
    
  return (
    <div className="w-full max-[820px]:w-[80%] max-sm:w-full flex flex-col gap-1 rounded shadow shadow-gray-500 p-1.5 bg-white">
        <div className='w-full flex flex-row justify-between items-center'>
            <div>
                <p className="text-[0.9rem] font-normal text-gray-500">
                    Written by <a href={currentuser.username===user?.username?`/profile/${user?.username}`:`/user/${user?._id}`} className="text-blue-600 capitalize">{currentuser.username===user?.username?"You":user?.username}</a> on <a href={`/?cat=${type}`} className="text-blue-600 capitalize">{type}</a> {moment(uploadDate).fromNow()}
                </p>
            </div>
            <ThreeDotMenu/>
        </div>
        <a href={`/${id}`}>
            <div className="w-full flex flex-row max-lg:items-center max-[821px]:flex-col justify-between gap-1 mt-0.5">
                <div className="w-[40%] max-[821px]:w-full">
                    <img src={img} alt={title} className="w-full aspect-[16/9] max-lg:aspect-[3/2] object-cover rounded-md shadow shadow-gray-400" />
                </div>
                <div className="w-[55%] max-[821px]:w-full flex flex-col gap-1.5">
                    <div className='w-full'>
                        <h2 className="capitalize text-xl font-semibold">{title}</h2>
                    </div>
                    <div className="w-full min-h-full overflow-x-auto">
                        <p className="text-emerald-700 text-[1rem] font-[450]">
                            {String(describtion).substring(0,500)+"..."} 
                            <span className="text-red-500 underline underline-offset-[3px] text-sm capitalize"> for reading full blog visit page</span>
                        </p>
                    </div>
                </div>
            </div>
        </a>
        <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
                <IconButton size='small' onClick={()=>setLike(!like)}>
                    {
                        like|| user?.username===currentuser.username?
                        <LikeBtnFilled />:
                        <LikeBtnOutlined />
                    } <span className="text-[1rem] font-semibold ml-0.5 text-sky-600">{likecount.length}</span>
                </IconButton>
                <CommentSectionPopUp
                    commentCount={0}
                    postname={title}
                    postId={id}
                />
                <>
                    <IconButton onClick={linkShare}>
                        <ShareBtn className='size-5 text-amber-700'/>
                    </IconButton>
                    <Snackbar
                        open={copied}
                        autoHideDuration={3000}
                        onClose={oncloseClick}
                        message="Post link copied to clipboard"
                        action={action}
                        color='#319f43'
                    />
                </>
            </div>
            <Badge badgeContent={bookmarkcount.length} color='primary' showZero sx={{marginRight:'0.5rem'}} onClick={()=>setBookmark(!bookmark)}>
                {
                    bookmark || currentuser.id?
                    <BookmarkedFilled />:
                    <BookmarkedOutline className='text-red-700 size-6'/>
                } 
            </Badge>
        </div>
    </div>
  )
}

Post.propTypes = {
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    likecount: PropTypes.number.isRequired,
    bookmarkcount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    describtion: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    uploadDate: PropTypes.string.isRequired,
    visitCount: PropTypes.string.isRequired
}

export default Post;
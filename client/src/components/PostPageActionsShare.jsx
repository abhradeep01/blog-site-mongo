import React from "react";
import { CloseBtn, ShareBtn } from "../config/icons";
import { IconButton, Snackbar } from "@mui/material";

function PostPageActionsShare (){
    //open 
    const [open,setOpen] = React.useState(false);

    //copy link function
    const handleShare = async (e) =>{
        e.preventDefault();
        await navigator.clipboard.writeText(window.location.href);
        setOpen(true);
    }

    //onclose event
    const onCloseClick = () =>{
        setOpen(false)
    }

    //actions 
    const action = (
        <IconButton size="small" onClick={()=>setOpen(false)}>
            <CloseBtn className='text-white size-5'/>
        </IconButton>
    );

    return(
        <>
            <button className="flex flex-row gap-1.5 items-center my-0.5 hover:cursor-pointer" onClick={handleShare}>
                <div>
                    <ShareBtn className='size-5 text-amber-600'/>
                </div>
                <div>
                    <p className="text-[0.925rem] text-amber-600 font-light">Copy this Post Link</p>
                </div>
            </button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={onCloseClick}
                message="Post link copied to clipboard"
                action={action}
            />
        </>
    )
}

export default PostPageActionsShare;
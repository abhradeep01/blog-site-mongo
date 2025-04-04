import React from "react";
import { CloseBtn, EditIcon, UploadIcon } from "../config/icons";
import PropsTypes from 'prop-types';
import { CircularProgress } from "@mui/material";

function EditProfile ({user}){
    //open edit
    const [open,setopen] = React.useState(false);
    //loading
    const [loading,setLoading] = React.useState(false);
    //info
    const [data,setData] = React.useState({
        name: user.name,
        username: user.username,
        bio: user.bio,
        img: user.img,
        instalink: user.insta,
        fblink: user.fb
    });
    //for big screen
    const bigscreen = "right-[35vw] left-[35vw] w-[30vw]";

    //onchange event 
    const onchangeEvent = (e) =>{
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    return (
        <>
            <button className="bg-green-600 h-fit text-white px-1.5 py-1 flex flex-row gap-0.5 items-center font-normal text-[0.9rem] rounded-sm hover:cursor-pointer hover:opacity-[90%] max-lg:hover:opacity-0" onClick={()=>setopen(true)}>
                <span><EditIcon className='text-white size-5'/></span> Edit Profile
            </button>
            <div className={open?`fixed bg-gray-100 rounded-md p-2 z-[3] ${bigscreen} max-[1025px]:right-[25vw] max-[1025px]:left-[25vw] max-[1025px]:w-[50vw] max-sm:right-[5vw] max-sm:left-[5vw] max-sm:w-[90vw] max-sm:top-[20vw] h-fit flex flex-col gap-4`:"hidden"}>
                <div className="w-full flex flex-row justify-between">
                    <div>
                        <h4 className="text-lg font-semibold">Edit Profile</h4>
                    </div>
                    <button className="h-fit hover:cursor-pointer" onClick={()=>setopen(false)}>
                        <CloseBtn className='size-6 text-gray-700'/>
                    </button>
                </div>
                <form className="w-full flex flex-col gap-3" >
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-[0.95rem] font-normal" htmlFor="name">Full Name:</label>
                        <input type="text" id="name" name="name" value={data.name} onChange={onchangeEvent} className="w-full rounded-sm h-[2rem] p-1.5 focus:outline-none border border-slate-400" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-[0.95rem] font-normal" htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={data.username} onChange={onchangeEvent} className="w-full rounded-sm h-[2rem] p-1.5 focus:outline-none border border-slate-400" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-[0.95rem] font-normal" htmlFor="bio">Bio:</label>
                        <textarea type="text" id="bio" name="bio" placeholder="Bio" value={data.bio} onChange={onchangeEvent} className="w-full rounded-sm h-[4.5rem] resize-none p-1.5 focus:outline-none border border-slate-400" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-[0.95rem] font-normal" htmlFor="instalink">Instagram Link:</label>
                        <input type="text" id="instalink" name="instalink" value={data.instalink} onChange={onchangeEvent} placeholder="Instagram account link" className="w-full rounded-sm h-[2rem] p-1.5 focus:outline-none border border-slate-400" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-[0.95rem] font-normal" htmlFor="fblink">Facebook Link:</label>
                        <input type="text" id="fblink" name="fblink" value={data.fblink} onChange={onchangeEvent} placeholder="Facebook account link" className="w-full rounded-sm h-[2rem] p-1.5 focus:outline-none border border-slate-400" />
                    </div>
                    <div className="w-fit flex flex-row gap-4 self-end mt-5">
                        <button className="text-base px-1.5 py-1 bg-gray-500 rounded-sm text-white capitalize font-medium hover:cursor-pointer hover:opacity-[90%] max-lg:hover:opacity-0" onClick={()=>setopen(false)}>
                            cancel
                        </button>
                        <button className="flex flex-row items-center gap-2 text-base px-2 py-1 bg-green-600 rounded-sm text-white capitalize font-medium hover:cursor-pointer hover:opacity-[90%] max-lg:hover:opacity-0">
                            {loading?<CircularProgress sx={{color:'white'}} size={17}/>:<UploadIcon className='size-5 text-white'/>} update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

EditProfile.propTypes = {
    user: PropsTypes.object.isRequired
}

export default EditProfile;
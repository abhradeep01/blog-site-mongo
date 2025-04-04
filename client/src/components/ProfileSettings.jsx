import React from "react";
import { SettingsIcon } from "../config/icons";

function ProfileSettings (){
    //open
    const [open,setOpen] = React.useState(false)
    return(
        <a href="/settings">
            <button className="bg-gray-600 h-fit text-white px-1.5 py-1 flex flex-row gap-0.5 items-center font-normal text-[0.9rem] rounded-sm hover:cursor-pointer hover:opacity-[90%] max-lg:hover:opacity-0">
                <SettingsIcon/> Settings
            </button>
        </a>
    )
}

export default ProfileSettings;
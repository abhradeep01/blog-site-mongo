import { IconButton } from "@mui/material";
import React from "react";
import { ThreeDotIcon } from "../config/icons";
import { threeDotContent } from "../config/assets";
import ThreeDotMenuOption from "./ThreeDotMenuOption";

function ThreeDotMenu (){
    //menu show
    const [show,setShow] = React.useState(false);

    return (
        <div className="relative">
            <IconButton size="small" onClick={()=>setShow(!show)}>
                <ThreeDotIcon/>
            </IconButton>
            <div className={show?"w-fit h-fit flex flex-col gap-1.5 absolute z-[2] right-4 bg-gray-200 p-1 rounded transition-all ease-in-out":"hidden"}>
                {threeDotContent.map((option,index)=>{
                    return (
                        <ThreeDotMenuOption
                            key={index}
                            text={option.text}
                            icon={option.icon}
                            color={option.color}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ThreeDotMenu;
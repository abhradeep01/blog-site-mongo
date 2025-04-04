import React from "react";
import { EditIcon } from "../config/icons";

function PostPageActionsEdit (){
    return (
        <button className="flex flex-row gap-1.5 items-center hover:cursor-pointer">
            <div>
                <EditIcon/>
            </div>
            <div>
                <p className="text-[0.925rem] font-light text-emerald-700">Edit this Post</p>
            </div>
        </button>
    )
}

export default PostPageActionsEdit;
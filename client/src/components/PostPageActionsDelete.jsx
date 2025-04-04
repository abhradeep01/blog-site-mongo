import React from "react";
import { DeleteIcon } from "../config/icons";

function PostPageActionsDelete(){
    return(
        <button className="flex flex-row gap-1.5 items-center hover:cursor-pointer">
            <div>
                <DeleteIcon/>
            </div>
            <div>
                <p className="text-[0.925rem] font-light text-red-600">Delete this Post</p>
            </div>
        </button>
    )
}

export default PostPageActionsDelete;
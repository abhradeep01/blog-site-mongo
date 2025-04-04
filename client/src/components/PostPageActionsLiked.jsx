import React from "react";
import { LikeBtnFilled, LikeBtnOutlined } from "../config/icons";

function PostPageActionliked () {
    // like 
    const [like,setLike] = React.useState(false);
    return (
        <button className="flex flex-row gap-1.5 items-center my-0.5 hover:cursor-pointer" onClick={()=>setLike(!like)}>
            <div>
                {
                    like?
                    <LikeBtnFilled className='size-5 text-cyan-500'/>:
                    <LikeBtnOutlined className='size-5 text-cyan-600'/>
                }
            </div>
            <div>
                <p className="text-[0.925rem] text-cyan-600 font-light">Like this Post</p>
            </div>
        </button>
    )
}

export default PostPageActionliked;
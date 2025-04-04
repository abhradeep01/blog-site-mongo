import React from "react";
import { BookmarkedFilled, BookmarkedOutline } from "../config/icons";

function PostPageActionBookmarked (){
    //shown 
    const [bookmark,setBookmark] = React.useState(false);

    return(
        <button className="flex flex-row gap-1.5 items-center my-0.5 hover:cursor-pointer" onClick={()=>setBookmark(!bookmark)}>
            <div>
                {
                    bookmark?
                    <BookmarkedFilled/>:
                    <BookmarkedOutline/>
                }
            </div>
            <div>
                <p className="text-[0.925rem] font-light">Save this Post</p>
            </div>
        </button>
    )
}

export default PostPageActionBookmarked;
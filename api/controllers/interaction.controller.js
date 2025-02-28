import asyncHanlder from "../middleware/asyncHandler.js"

//post liked function
const liked = asyncHanlder(async (req,res,next) =>{
    res.send(req.params.id)
})


//post unliked function
const unliked = asyncHanlder(async (req,res,next) =>{
    res.send(req.params.id)
})


//post bookmarked function
const bookmarked = asyncHanlder(async (req,res,next) =>{
    res.send(req.params.id)
})


//post unbookmarked function
const unbookmarked = asyncHanlder(async (req,res,next) =>{
    res.send(req.params.id)
})


//add comment to post
const addComment = asyncHanlder(async (req,res,next) =>{

})


//edit comment
const editComment = asyncHanlder(async (req,res,next) =>{

})


//delete comment
const deleteComment = asyncHanlder(async (req,res,next) =>{

})


// export
export { liked, unliked, bookmarked, unbookmarked, addComment, editComment, deleteComment }
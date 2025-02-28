import asyncHanlder from "../middleware/asyncHandler.js"

//userinfo 
const userInfo = asyncHanlder(async (req,res,next) =>{
    res.send(req.params.username)
})


//bookmarked post by user
const userBookmarked = asyncHanlder(async (req,res) =>{
    res.send(`book marked by ${req.params.username}`)
})


//liked post by user
const userLiked = asyncHanlder(async (req,res) =>{
    res.send(`post liked by ${req.params.username}`)
})


//user info update
const userInfoUpdate = asyncHanlder(async (req,res) =>{
    res.send(`${req.params.username} is updated`)
})


//delete user
const deleteUser = asyncHanlder(async (req,res) =>{
    res.send(`${req.params.username} is deleted`)
})


//export
export { userInfo, userLiked, userBookmarked, userInfoUpdate, deleteUser}
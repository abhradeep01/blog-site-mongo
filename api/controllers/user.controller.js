//userinfo 
export const userInfo = async (req,res) =>{
    res.send(req.params.username)
}


//bookmarked post by user
export const userBookmarked = async (req,res) =>{
    res.send(`book marked by ${req.params.username}`)
}


//liked post by user
export const userLiked = async (req,res) =>{
    res.send(`post liked by ${req.params.username}`)
}


//user info update
export const userInfoUpdate = async (req,res) =>{
    res.send(`${req.params.username} is updated`)
}


//delete user
export const deleteUser = async (req,res) =>{
    res.send(`${req.params.username} is deleted`)
}
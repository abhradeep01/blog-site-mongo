//all posts function
export const getPosts = async (req,res) =>{
    res.send('all posts');
}


//addpost function
export const addPost = async (req,res) =>{
    res.send('add post')
}


//post liked function
export const liked = async (req,res) =>{
    res.send(req.params.id)
}


//post unliked function
export const unliked = async (req,res) =>{
    res.send(req.params.id)
}


//post bookmarked function
export const bookmarked = async (req,res) =>{
    res.send(req.params.id)
}


//post unbookmarked function
export const unbookmarked = async (req,res) =>{
    res.send(req.params.id)
}


//update post function
export const updatePost = async (req,res) =>{
    res.send(`update full post ${req.params.id}`);
}


//partial update function
export const partialUpdate = async (req,res) =>{
    res.send(`partial change ${req.params.id}`)
}


//delete post function
export const deletePost = async (req,res) =>{
    res.send(`post delete ${req.params.id}`)
}
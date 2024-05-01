import Post from "../Models/Posts.js";
import User from "../Models/User.js";

/* CREATE POST */
export const createPost = async (req, res)=>{
    try {
        const {userId, description, picturePath} = req.body;

        //find user making the post
        const user = await User.findById(userId);
        console.log(userId + " userid")
        console.log(user.firstName + " firstname");
        console.log(user.picturePath + " picturepath");

        //create new post
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        //get all posts
        const posts =  await Post.find();
        res.status(201).json(posts)
        
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


/* READ */ 
export const getFeedPosts = async (req,res)=>{
    try {
        const post = await Post.find();
        res.status(200).json({post});
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}

export const getUserPosts = async (req,res)=>{
    try {
        //destruct userid from req body
        const {userId} = req.params;

        //find user posts
        const userPosts = await Post.find({userId});

        res.status(200).json({userPosts})
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}



/* UPDATE*/ 
export const likePost = async (req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(201).json({updatedPost});
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}
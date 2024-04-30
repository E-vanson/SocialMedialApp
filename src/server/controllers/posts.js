import Post from "../Models/Posts.js";
import User from "../Models/User.js";

/* CREATE POST */
export const createPost = async (req, res)=>{
    try {
        const {userId, description, picturePath} = req.body;

        //find user making the post
        const user = User.findById(userId);
        //create new post
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            like: {},
            comments: []
        })
        await newPost.save();

        //get all posts
        const posts = Post.find();
        res.status(201).json({posts})
        
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


/* READ */ 
export const getFeedPosts = async (req,res)=>{
    try {
        const post = Post.find();
        res.status(200).json({post});
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}

export const getUserPosts = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

export const likePost = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
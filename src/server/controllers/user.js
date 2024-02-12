import User from "../Models/User.js";

export const getUser = async (req, res)=>{
    try {
     //destructure id from the parameters
    const {id} = req.params;
    //find user using the id
    const user = await User.findById(id);
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json({"msg": error.message});
    }
}

export const getUserFriends = async (req, res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id)=>{User.findById(id)})
        )
        
        const formattedFriends = await friends.map(
           ( {   _id,firstName,lastName,occupation,location,picturePath })=>{
            return {_id,firstName,lastName,occupation,location,picturePath};
           }
           )
           res.status(200).json(formattedFriends);
    }catch(err){
        res.status(500).json({msg: err.message}
                );
    }
   
}
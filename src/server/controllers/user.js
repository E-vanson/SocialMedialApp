import User from "../Models/User.js";
import mongoose from "mongoose";

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
        console.log("id: " + id);
        const validObjectId = mongoose.Types.ObjectId.isValid(id);
        console.log("Endpoint is working")
if (!validObjectId) {
    console.log('Invalid ObjectId');
} else {
    // Use the valid ObjectId
    console.log("valid");
}
        const user = await User.findById(id);
        console.log(user.friends);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
    
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )
        const formattedFriends = friends.map(
           ({_id,firstName,lastName,picturePath,occupation})=>{
            return {_id,firstName,lastName,picturePath,occupation};
           }
           )
           console.log(formattedFriends + " friends");
          
           //res.status(200).json(formattedFriends);
           res.status(200).json(formattedFriends);
    }catch(err){
        //console.error(err)
        res.status(500).json({msg: err.message}
                );
    }
}

/* UPDATE */
export const addRemoveFriends = async (req, res)=>{
    try{
         //Destructure userid and friendid to be added or removed from the req params
    const {id, friendId} = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    console.log(friendId)
    console.log(user.firstName + " user")
    console.log(friend.firstName + " friend");
   
    //check if users friendlist contains the friend
    if(user.friends.includes(friendId)){
        console.log("Both are friends so unfriend!!")
      user.friends =  user.friends.filter((id)=>{id != friendId});
      friend.friends =  friend.friends.filter((id)=>{id != id});
    }else{
        user.friends.push(friendId);
        friend.friends.push(id);
        console.log("Now they are friends");
    }
    user.save();
    friend.save();

    const friends = await Promise.all(
        user.friends.map((id)=>{
            const user = User.findById(id);
            console.log(user + " userr")
            return user
        }
        )
            );

            console.log(friends + " friends");
    const formattedFriends = await friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
    );
    res.status(200).json(formattedFriends);
    }catch(err){
        res.status(404).json({msg: err.message});
        console.log(err + " err");
    }
   
}
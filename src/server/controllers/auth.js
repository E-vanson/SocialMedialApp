import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "../Models/User.js";

/* REGISTER USER */
export const register = async (req,res)=>{
    try {
        //destructure req body
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            occupation,
            picturePath,
            location
        } = req.body;

        //generate salt
        const salt = await bcrypt.genSalt()
        const passwordHashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHashed,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(501).json({error: err.message});
    }
}

export const login = async (req, res) =>{
    try {
        //destructure req.body
    const {email, password} = req.body;
    //check if user exists
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({msg:"User doesn't exist"});

    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

    //genrate jwt
    const token = jsonwebtoken.sign({id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}
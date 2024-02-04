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
            occupation,
            location,
            friends,
            picturePath,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(501).json({error: err.message});
    }
}
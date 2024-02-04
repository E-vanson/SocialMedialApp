import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

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
    } catch (error) {
        
    }
}
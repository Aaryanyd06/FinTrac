import expres from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

export const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {

        const userExists = await User.findOne({email});

        if(userExists){
            return(
                res.status(400).json({
                    message: "User already exists"
                })
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token})

        
    } catch (error) {
        res.status(500).json({
            error: err.message
        })
        
    }
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            return(
                res.status(404).json({
                    message: "user not found"
                })
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return(
                res.status(400).json({
                    message: "Invalid credentials"
                })
            )
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }

}


export const googleLogin = async (req,res) => {
    const {tokenId} = req.body;

    try {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const {email, name, sub: googleId} = ticket.getPayload();

        let user = await User.findOne({email});
        if(!user){
            user = new user({name, email, googleId});
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
} 
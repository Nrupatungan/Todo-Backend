import { Request, Response } from "express";
import userSchema from "../types/validators/user.validator";
import { UserSchema } from "../types/zodTypes";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt"

// Create a new user
const signup = asyncHandler(async (req: Request, res: Response) => {
  const {error} = userSchema.safeParse(req.body)
  const {clerkId, email, username, password} = req.body as UserSchema

  if(error) {
    return res.status(400).json({message: error.errors[0].message})
  }

  // Check if User already exists
  const userExists = await User.findOne({$or: [{username}, {email}]});

  if(userExists) {
    return res.status(400).json({message: "User already exists"})
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({ clerkId, email, username, password: hashedPassword })
  
  if(!newUser) {
    return res.status(500).json({message: "Failed to create user"})
  }

    return res.status(201).json({message: "User created successfully"})
});

const signin = asyncHandler(async (req: Request, res: Response) => {
  const {error} = userSchema.safeParse(req.body);
  const {username, email, password, clerkId} = req.body as UserSchema
  
  if (error) {
    return res.status(400).json({ message: error.errors[0].message });
  }

    const findUser = await User.findOne({$or: [{username}, {email}, {clerkId}]});
    
    if(!findUser) {
        return res.status(404).json({message: "User not found"})
    }
    
    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if(!isPasswordValid) {
        return res.status(401).json({message: "Invalid password"})
    }

    return res.status(201).json({message: "User logged successfully"})
});

export {
    signin,
    signup
}
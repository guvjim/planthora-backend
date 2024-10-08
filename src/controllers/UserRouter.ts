import express, { Request, Response } from 'express';
import { UserModel } from '../models/models';

const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req:Request, res:Response) => {
    const getUsers = await UserModel.find({});

    console.log(getUsers);
    res.status(200).json({ message: "all users", data: getUsers });
});

// Create User
userRouter.post('/', async (req:Request, res:Response) => {
    const { name, lastname, username } = req.body;
    try {
        const newUser = new UserModel({
            name,
            lastname,
            username,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "The user could not be saved", error });
    }
});

// Modify user by id
userRouter.patch('/:id', async (req:Request, res:Response) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            // return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "User modified successfully", data: updatedUser});
    } catch (error) {
        res.status(500).json({ message: "The user could not be modified", error});
    }
});

// Get user by id
userRouter.get('/:id', async (req:Request, res:Response) => {
    const getOneUser = await UserModel.findById(req.params.id);

    console.log(getOneUser);
    res.status(200).json({ message: "Displaying one user", data: getOneUser });
});

// Delete user by id
userRouter.delete('/:id', async (req:Request, res:Response) => {
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
        // if(!deleteUser){
        //     return res.status(404).json({ message: "User not found" })
        // }
        res.status(200).json({ message: "User deleted sucessfully", data: deleteUser });
    } catch (error) {
        res.status(500).json({ message: "The user could not be deleted", error });
    }
});

export default userRouter;
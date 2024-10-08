import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    lastname: string;
    username: string;
}

export const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        lastname: {
            type: String,
            required: true,
            unique: false
        },
        username: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);
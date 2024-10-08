import mongoose, { Model } from "mongoose";
import { userSchema, User } from "../schemas/UserSchema";
// import { postSchema, Post } from "../schemas/PostSchema";

export const UserModel: Model<User> = mongoose.model<User>('User', userSchema)
// export const PostModel: Model<Post> = mongoose.model<Post>('Post', postSchema)

// export { UserModel, PostModel };
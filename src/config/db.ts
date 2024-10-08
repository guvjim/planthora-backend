import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoConnect = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/planthora-v1');
        console.log(`MongoDB connected: ${mongoConnect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("MongoSb already connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptopeaReactDB',
        })
        isConnected = true
    } catch (error) {
        console.log(error);
    }

}
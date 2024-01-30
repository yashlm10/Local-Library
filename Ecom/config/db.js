import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongo db ${conn.connection.host}`);
    }catch(error){
        console.log(`there is an error which is ${error}`);
    }
};

export default connectDB;
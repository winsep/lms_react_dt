import mongoose from "mongoose";

// connect mongo

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("DB Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/lms-react-dt`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB
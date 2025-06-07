import mongoose from "mongoose";

// connect mongo

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> console.log('DB connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms-react-dt`)
}

export default connectDB
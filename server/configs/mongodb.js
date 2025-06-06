import mongoose from "mongoose";

//Connectt to the MongoDB database

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms_react_dt`)
}
export default connectDB
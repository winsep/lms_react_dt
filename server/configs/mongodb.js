import mongoose from "mongoose";

// connect mongo
const connectDB = async () => {
    try {
        // Kết nối MongoDB với options rõ ràng
        await mongoose.connect(`${process.env.MONGODB_URI}/lms-react-dt`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,   // thời gian chờ khi kết nối server
            socketTimeoutMS: 20000,            // thời gian chờ khi xử lý truy vấn
            bufferCommands: false              // tắt buffering khi mất kết nối
        });

        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

    } catch (error) {
        console.error("❌ Initial MongoDB connection error:", error.message);
        process.exit(1); // thoát app nếu không kết nối được
    }
};

export default connectDB;

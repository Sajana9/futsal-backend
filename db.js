import mongoose from "mongoose"

const MONGO_URI = "mongodb://127.0.0.1:27017"


const connectDB = () => {
    try {
        mongoose.connect(MONGO_URI)
        console.log("connected to database successfully")
    } catch (error) {
        console.log(error, "error while connecting to database")
    }
}

export default connectDB
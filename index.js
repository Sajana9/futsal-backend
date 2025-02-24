import express from "express"
import connectDB from "./db.js";
import futsalRoute from "./routes/futsalRoutes.js"
import authRoute from "./routes/authRoutes.js"
import bookRoute from "./routes/bookingRoutes.js"

const app = express();

connectDB()



const port = 5000

app.use(express.json())

app.use('/api', futsalRoute)
app.use('/api', authRoute)
app.use("/api", bookRoute)

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})
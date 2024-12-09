import express from "express"
import connectDB from "./db.js";
import futsalRoute from "./routes/futsalRoutes.js"

const app = express();

connectDB()



const port = 5000

app.use(express.json())

app.use('/api', futsalRoute)

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})
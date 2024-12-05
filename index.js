import express from "express"
import connectDB from "./db.js";

const app = express();

connectDB()

const port = 5000

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})
import express from 'express'
import userRoute from './src/routes/user.route.js'
import connectDatabase from "./src/database/db.js"

const app = express()

connectDatabase()
const port = 3000;
app.use(express.json())
app.use("/user", userRoute)



app.listen(port, () =>console.log(`Server running on port: ${port}`))
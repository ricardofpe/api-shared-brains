import express from 'express'
import connectDatabase from "./src/database/db.js"
import dotenv from 'dotenv'


import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import thoughtsRoute from './src/routes/thoughts.route.js'
import swaggerRoute from './src/routes/swagger.route.js'



dotenv.config();

const app = express()

connectDatabase()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/thoughts", thoughtsRoute)
app.use("/doc", swaggerRoute)



app.listen(port, () =>console.log(`Server running on port: ${port}`))
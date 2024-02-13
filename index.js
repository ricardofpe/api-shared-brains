import express from 'express'
import connectDatabase from "./src/database/db.js"
import dotenv from 'dotenv'


import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import pensamentosRoute from './src/routes/pensamentos.route.js'



dotenv.config();

const app = express()

connectDatabase()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/pensamentos", pensamentosRoute)



app.listen(port, () =>console.log(`Server running on port: ${port}`))
const express = require('express')
const userRoute = require('./src/routes/user.route')

const connectDatabase = require("./src/database/db")

const app = express()

connectDatabase()
const port = 3000;
app.use(express.json())
app.use("/user", userRoute)



app.listen(port, () =>console.log(`Servidor rodando da porta ${port}`))

import express from "express"

const app = express()

import cors from "cors"

export const authCors = app.use((req, res, next) =>{

    res.header("Acess-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})

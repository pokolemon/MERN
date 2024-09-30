
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import connectToDatabase from './db/db.js'

import dotenv from 'dotenv';
dotenv.config();

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is Running on port ${process.env.PORT}`)

})
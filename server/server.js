import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks } from './controllers/webhooks.js'

// initialize express
const app = express()

// connect to database
connectDB()

//middleware
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

//routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT} `)
})
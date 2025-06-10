import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks, { stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser'

// initialize express
const app = express()

// connect to database
connectDB()
await connectCloudinary()

//middleware
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

//routes
app.get('/', (req, res) => res.send("API Working"))
app.use('/api/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhooks)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT} `)
})
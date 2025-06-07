import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bodyParser from 'body-parser'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

await connectDB()
app.use(cors())

// 👉 Add raw body middleware only for /clerk
app.post('/clerk',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
)

app.get('/', (req, res) => res.send("API Working"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

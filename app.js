// imports
import { config } from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import router from './routes/routes.js'

// config
config()

// express
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'uploads')))

// database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// routes prefix
app.use('/api/post', router)

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// load environment variables
require('dotenv').config()

// import and setup packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// init the express app
const app = express()

// mount middleware
app.use(cors())
app.use(bodyParser.json())

// mongo connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error: ", err))

// routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//api routes for the user model
const userRoutes = require('./routes/user')
app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
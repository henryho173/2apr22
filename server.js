const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/subscribers', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server Started'))

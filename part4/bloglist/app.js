const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
// middleware
const blogRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config/config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error)
    })

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
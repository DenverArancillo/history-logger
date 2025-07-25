import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// get the directory name
// import.meta.url -> gives file url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// middleware
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

// routes
import tags from './routes/tags.js'
import historyItem from './routes/historyItem.js'

const port = process.env.PORT || 8000
const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// logger middleware
app.use(logger)

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/tags', tags)
app.use('/api/historyItem', historyItem)

// error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))
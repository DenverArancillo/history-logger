import express, { Express } from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// get the directory name
// import.meta.url -> gives file url
// const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// middleware
import logger from './middleware/logger'
import notFound from './middleware/notFound'
import errorHandler from './middleware/error'

// routes
import tags from './routes/tags'
import historyItem from './routes/historyItem'

const port = process.env.PORT || 8000
const app: Express = express()

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
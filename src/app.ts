/**
 * app.ts - route handle, middleware, route related error
 */
import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/book.controller'
import { errorHandler } from './middlewares/errorHandler'
import { borrowRoutes } from './app/controllers/borrow.controller'

const app: Application = express()
// Middleware to parse JSON bodies
app.use(express.json())

app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)

// 🔥 Custom error handler should be after all routes
app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to - My Library Management System!')
})

export default app

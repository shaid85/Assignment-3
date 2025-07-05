/**
 * app.ts - route handle, middleware, route related error
 */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { bookRoutes } from './app/controllers/book.controller'
import { errorHandler } from './middlewares/errorHandler'
import { borrowRoutes } from './app/controllers/borrow.controller'

const app: Application = express()
// Middleware to parse JSON requests
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://assingnment-4-chi.vercel.app'],
  })
)
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send(/* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Library Management System</title>
        <style>
          body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #000;
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #fff;
            font-size: 2rem;
          }
        </style>
      </head>
      <body>
        <h1>📚 Welcome to My Library Management System!</h1>
      </body>
    </html>
  `)
})

// Custom error handler
app.use(errorHandler)

export default app

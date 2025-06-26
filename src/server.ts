/**
 * server.ts - server handle like - server start, close, error handle etc.
 */

import app from './app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000

async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/book-app`)

    console.log('MongoDB connected successfully: ')

    if (process.env.NODE_ENV !== 'production') {
      app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running locally on port: ${port}`)
      })
    }
  } catch (error) {
    console.log('MongoDB connected Error: ', error)
    process.exit(1)
  }
}

main()

export default app

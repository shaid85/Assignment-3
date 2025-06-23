/**
 * server.ts - server handle like - server start, close, error handle etc.
 * This file is responsible for starting the server and listening on a specific port.
 */

import app from './app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000

async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`)

    app.listen(port, () => {
      console.log(`Example app listening on port: ${port}`)
    })
  } catch (error) {
    console.log('MongoDB connected Error: ', error)
    process.exit(1)
  }
}

main()

// Export Express app as a handler
export default app

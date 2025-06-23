/**
 * server.ts - server handle like - server start, close, error handle etc.
 * This file is responsible for starting the server and listening on a specific port.
 */

import app from './app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env',
})

const port = process.env.PORT || 3000

async function main() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/book-app`
    )
    console.log(
      `\n MongoDB connected !!\n Database Name: ${connectionInstance.connection.name}\n Host: ${connectionInstance.connection.host}\n Port: ${connectionInstance.connection.port}\n`
    )
    app.listen(port, () => {
      console.log(`Example app listening on port: ${port}`)
    })
  } catch (error) {
    console.log('MongoDB connected Error: ', error)
    process.exit(1)
  }
}

main()

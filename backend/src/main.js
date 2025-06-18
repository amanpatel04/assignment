import './utils/loadEnv.js'
import connectDB from './db/connect.js'
import app from './app.js'

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}).catch(error => {
  console.log(error)
  process.exit(1)
})
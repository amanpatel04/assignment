import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

import { router as userRouter } from './routers/user.router.js'

app.use('/api/user', userRouter)

export default app
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(express.json({ limit: '1mb' }))

import { router as userRouter } from './routers/user.router.js'
import { router as contestRouter } from './routers/contest.router.js'
import { router as prolemRouter } from './routers/problem.router.js'

app.use('/api/user', userRouter)
app.use('/api/contest', contestRouter)
app.use('/api/problem', prolemRouter)

export default app
import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'

import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'uploads'),
  prefix: '/uploads',
})

app.register(multipart)

app.register(jwt, {
  secret: 'nlw-spacetime',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server listening on port 3333')
  })

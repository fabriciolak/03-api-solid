import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()
const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Fabrício',
    email: 'fabriciolak12@gmail.com',
  },
})

app.get('/', async (request, reply) => {
  reply.send('oi')
})

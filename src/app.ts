import fastify from "fastify";

export const app = fastify()

app.get('/', async (request, reply) => {
  reply.send('oi')
})
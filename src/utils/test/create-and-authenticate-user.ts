import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({ name: 'John Doe', email: 'johndoe@does.com', password: '123456' })
    .expect(201)

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email: 'johndoe@does.com', password: '123456' })

  const { token } = authResponse.body

  return { token }
}

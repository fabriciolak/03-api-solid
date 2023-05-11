import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Authenticate (E2E)', () => {
  it('Should be able authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'johndoe@does.com', password: '123456' })
      .expect(201)

    const response = await request(app.server)
      .post('/sessions')
      .send({ email: 'johndoe@does.com', password: '123456' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

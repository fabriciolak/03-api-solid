import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register (E2E)', () => {
  it('Should be able register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'johndoe@does.com', password: '123456' })

    expect(response.statusCode).toBe(201)
  })
})

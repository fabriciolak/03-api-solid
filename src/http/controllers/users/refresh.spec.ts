import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Refresh token (E2E)', () => {
  it('Should be able refresh a token', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'johndoe@does.com', password: '123456' })
      .expect(201)

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'johndoe@does.com', password: '123456' })

    const cookies = await authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Profile (E2E)', () => {
  it('Should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'johndoe@does.com', password: '123456' })
      .expect(201)

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'johndoe@does.com', password: '123456' })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@does.com',
      }),
    )
  })
})
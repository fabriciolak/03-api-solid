import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Search Gyms (E2E)', () => {
  it('Should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym',
        description: 'some',
        phone: '9999-9999',
        latitude: -12.0629226,
        longitude: -43.5510806,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Hero',
        description: 'other some description',
        phone: '9999-9999',
        latitude: -12.0629226,
        longitude: -43.5510806,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Gym',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym',
      }),
    ])
  })
})

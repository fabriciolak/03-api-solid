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

describe('Create Gym (E2E)', () => {
  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const createdGym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym',
        description: 'some',
        phone: '9999-9999',
        latitude: -12.0629226,
        longitude: -43.5510806,
      })

    expect(createdGym.statusCode).toEqual(201)
  })
})

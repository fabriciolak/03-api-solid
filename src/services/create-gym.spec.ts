import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymService

describe('Register service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('Should be able to create an gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia de bairro',
      description: null,
      phone: null,
      latitude: -12.0629226,
      longitude: -43.5510806,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGyms

describe('Fetch nearby use case ', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGyms(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -12.0629226,
      longitude: -43.5510806,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -12.1756125,
      longitude: -43.2168388,
    })

    const { gyms } = await sut.execute({
      userLatitude: -12.0629226,
      userLongitude: -43.5510806,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

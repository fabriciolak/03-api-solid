import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymService } from './search-gyms'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymService

describe('Search gyms use case ', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('Should be able to to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia de bairro',
      description: null,
      phone: null,
      latitude: -12.0629226,
      longitude: -43.5510806,
    })

    await gymsRepository.create({
      title: 'Academia de condomínio',
      description: null,
      phone: null,
      latitude: -12.0629226,
      longitude: -43.5510806,
    })

    const { gyms } = await sut.execute({
      query: 'bairro',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia de bairro' }),
    ])
  })

  it('Should be able to tech paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: 'Academia ' + i,
        description: null,
        phone: null,
        latitude: -12.0629226,
        longitude: -43.5510806,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 21' }),
      expect.objectContaining({ title: 'Academia 22' }),
    ])
  })
})

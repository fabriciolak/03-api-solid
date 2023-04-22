import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User check-in history use case ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: '01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: '02',
      user_id: 'user-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '01' }),
      expect.objectContaining({ gym_id: '02' }),
    ])
  })

  it('Should be able to to fetch paginated user check-ins history', async () => {
    for (let i = 1; i < 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: `user-${i}`,
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Get user profile service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: 'user-01',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('Should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 20, 22, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: '01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2023, 3, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: 'user-01',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })
})

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInService

describe('Get user profile service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository?.items.push({
      id: 'gym-01',
      title: 'Academia',
      description: 'Academia de bairro',
      phone: '99 9999-9999',
      latitude: new Decimal(-12.0629226),
      longitude: new Decimal(-43.5510806),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.0629226,
      userLongitude: -43.5510806,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('Should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 20, 22, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.0629226,
      userLongitude: -43.5510806,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -12.0629226,
        userLongitude: -43.5510806,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.0629226,
      userLongitude: -43.5510806,
    })

    vi.setSystemTime(new Date(2023, 3, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.0629226,
      userLongitude: -43.5510806,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('Should not be able make check in if distance for more high', async () => {
    gymsRepository?.items.push({
      id: 'gym-02',
      title: 'Academia',
      description: 'Academia de bairro',
      phone: '99 9999-9999',
      latitude: new Decimal(-12.2201751),
      longitude: new Decimal(-43.5455172),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -12.0629226,
        userLongitude: -43.5510806,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

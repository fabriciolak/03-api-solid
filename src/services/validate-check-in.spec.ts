import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate check in', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toStrictEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to validate the check-in after 20 minutes of the creation', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // 21 minutes

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})

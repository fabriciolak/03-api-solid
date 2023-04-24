import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = await this.items.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date() : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isSameDate =
        checkInDate.isAfter(startOfDate) && checkInDate.isBefore(endOfDate)

      return checkIn.user_id === userID && isSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userID: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userID)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userID: string) {
    return this.items.filter((item) => item.user_id === userID).length
  }
}

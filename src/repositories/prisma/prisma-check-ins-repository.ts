import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userID,
        created_at: {
          gte: startOfDate.toDate(),
          lte: endOfDate.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userID: string, page: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: {
        user_id: userID,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async countByUserId(userID: string) {
    const checkIn = await prisma.checkIn.count({
      where: {
        user_id: userID,
      },
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      data,
      where: {
        id: data.id,
      },
    })

    return checkIn
  }
}

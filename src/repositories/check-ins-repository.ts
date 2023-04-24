import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userID: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userID: string, page: number): Promise<CheckIn[]>
  findById(checkInId: string): Promise<CheckIn | null>
  countByUserId(userID: string): Promise<number>
  save(data: CheckIn): Promise<CheckIn>
}

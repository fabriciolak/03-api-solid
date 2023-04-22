import { Gym } from '@prisma/client'

export interface GymRepository {
  findById(userID: string): Promise<Gym | null>
}

import { Gym } from '@prisma/client'
import { GymRepository } from '../gyms-repository'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(userID: string) {
    const user = await this.items.find((user) => user.id === userID)

    if (!user) {
      return null
    }

    return user
  }
}

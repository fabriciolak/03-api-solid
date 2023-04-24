import { Gym, Prisma } from '@prisma/client'
import { GymRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(userID: string) {
    const user = await this.items.find((user) => user.id === userID)

    if (!user) {
      return null
    }

    return user
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}

import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGyms {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}

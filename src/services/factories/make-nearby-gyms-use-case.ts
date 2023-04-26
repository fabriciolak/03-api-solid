import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const registerUserCase = new FetchNearbyGyms(gymRepository)

  return registerUserCase
}

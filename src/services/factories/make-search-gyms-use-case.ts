import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymService } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new SearchGymService(gymRepository)

  return useCase
}

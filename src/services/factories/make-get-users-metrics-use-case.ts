import { GetUserMetricsService } from '../get-users-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUsersProfileUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsService(checkInsRepository)

  return useCase
}

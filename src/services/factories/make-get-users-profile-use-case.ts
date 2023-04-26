import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileService } from '../get-user-profile'

export function makeGetUsersProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileService(usersRepository)

  return useCase
}

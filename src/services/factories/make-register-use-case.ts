import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserCase = new RegisterUserCase(usersRepository)

  return registerUserCase
}

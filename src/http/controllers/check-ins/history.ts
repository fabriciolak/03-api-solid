import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUsersCheckInsHistoryUseCase } from '@/services/factories/make-fetch-users-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).max(20).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(request.query)
  const checkInsHistoryUseCase = makeFetchUsersCheckInsHistoryUseCase()

  const { checkIns } = await checkInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkIns,
  })
}

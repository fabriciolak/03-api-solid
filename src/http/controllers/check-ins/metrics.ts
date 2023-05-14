import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUsersMetricsUseCase } from '@/services/factories/make-get-users-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryUseCase = makeGetUsersMetricsUseCase()

  const { checkInsCount } = await checkInsHistoryUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}

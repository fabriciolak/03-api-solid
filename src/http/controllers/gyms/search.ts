import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).max(20).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.body)
  const searchGymsUseCase = await makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({
    gyms,
  })
}

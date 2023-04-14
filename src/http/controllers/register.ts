import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists'
import { makeRegisterService } from '@/services/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterService()

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    } else {
      // we must be use an external application log error to track and resolve any issue Datadog/newrelic/sentry
    }

    throw error
  }

  return reply.status(201).send()
}

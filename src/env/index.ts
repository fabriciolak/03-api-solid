import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error(
    `❌ Invalid environment variables: ${_env.error.errors.map((k) => {
      return ` ${k.path}: ${k.message}`
    })}`,
  )
}

export const env = _env.data

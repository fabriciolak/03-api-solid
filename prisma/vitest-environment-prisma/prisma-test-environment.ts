import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import 'dotenv/config'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

function generateSchemaURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please, provide DATABASE_URL environment')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateSchemaURL(schema)

    process.env.DATABASE_URL = databaseURL
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}

import { it, describe } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  it('Must be hash password upon user register', async () => {
    const registerUseCase = new RegisterUserCase({
      async findByEmail(_) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)

    console.log(isPasswordHashed)
  })
})

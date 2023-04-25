import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation >= 20) {
      throw new LateCheckInValidateError()
    }
    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}

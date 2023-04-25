export class LateCheckInValidateError extends Error {
  constructor() {
    super('Is not possible to validate a check-in after 20 minutes')
  }
}

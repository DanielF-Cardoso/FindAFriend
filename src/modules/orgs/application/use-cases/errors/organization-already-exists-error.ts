export class OrganizationAlreadyExistsError extends Error {
  constructor(type: string) {
    super(`Organization with ${type} already exists`)
  }
}

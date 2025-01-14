export class OrganizationNotFoundError extends Error {
  constructor() {
    super(`Organization not found`)
  }
}

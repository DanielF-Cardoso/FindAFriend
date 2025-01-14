export class PetNotFoundError extends Error {
  constructor(id: string) {
    super(`Pet with id ${id} not found`)
  }
}

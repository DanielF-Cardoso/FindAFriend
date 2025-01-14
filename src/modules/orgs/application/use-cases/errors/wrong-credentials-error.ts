export class WrongCredentialsError extends Error {
  constructor() {
    super(`Wrong credentials`)
  }
}

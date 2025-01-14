import { Either, left, right } from '../../../../core/either'
import { Encrypter } from '../../cryptography/encrypter'
import { HasherComparer } from '../../cryptography/hash-comparer'
import { OrganizationRepository } from '../repositories/org-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

type AuthenticateOrganizationResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateOrganizationUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private hashComparer: HasherComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const findOrganizationByEmail = await this.orgRepository.findByEmail(email)

    if (!findOrganizationByEmail) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      findOrganizationByEmail.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: findOrganizationByEmail.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}

import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../core/either'
import { Encrypter } from '../../cryptography/encrypter'
import { HasherComparer } from '../../cryptography/hash-comparer'
import { OrganizationRepository } from '../repositories/org-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { AuthenticateOrganizationDto } from '../../dtos/authenticate-org.dto'

type AuthenticateOrganizationResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateOrganizationUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private hashComparer: HasherComparer,
    private encrypter: Encrypter,
  ) {}

  async execute(
    dto: AuthenticateOrganizationDto,
  ): Promise<AuthenticateOrganizationResponse> {
    const { email, password } = dto

    const organization = await this.orgRepository.findByEmail(email)

    if (!organization) {
      return left(new WrongCredentialsError())
    }

    const passwordMatches = await this.hashComparer.compare(
      password,
      organization.password,
    )

    if (!passwordMatches) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: organization.id.toString(),
    })

    return right({ accessToken })
  }
}
